import { ref } from 'vue'
import { useHelpers } from '@/shared/composables'
import { supabase } from '@/plugins/supabase'
import {
  type PostWithProfile,
  type Post,
  PostsWithProfileSchema,
} from '../types/Blog'

const posts = ref<PostWithProfile[]>([])

const { delay, handleError } = useHelpers()

const isPending = ref(false)
const error = ref<string | null>(null)

const clearErrorAndSetPending = async () => {
  error.value = null
  isPending.value = true
  await delay()
}

const usePost = () => {
  const fetchPosts = async () => {
    try {
      await clearErrorAndSetPending()
      const { data, error: err } = await supabase
        .from('post')
        .select('id, title, text, created_at, profiles(id, username)')

      if (err) throw err
      if (data) {
        const parsedData = PostsWithProfileSchema.parse(data)
        posts.value = parsedData
      }
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }

  const addPost = async (post: Post, user_id: string) => {
    try {
      const postData = { ...post, user_id }
      await clearErrorAndSetPending()
      const { data, error: err } = await supabase
        .from('post')
        .insert(postData)
        .select()
      if (err || !data) throw Error('Não foi possível postar')
      return data
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }
  const deletePost = async (id: number) => {
    try {
      await clearErrorAndSetPending()
      const { error: err } = await supabase.from('post').delete().eq('id', id)
      if (err) throw err
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }
  return { isPending, error, posts, addPost, deletePost, fetchPosts }
}

export default usePost
