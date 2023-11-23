import { ref } from 'vue'
import { useHelpers } from '@/shared/composables'
import { supabase } from '@/plugins/supabase'
import {
  type PostWithProfile,
  type Post,
  PostsWithProfileSchema,
  PostWithProfileSchema,
} from '../types/Blog'

const posts = ref<PostWithProfile[]>([])
const post = ref<PostWithProfile>()

const { delay, handleError } = useHelpers()

const isPending = ref(false)
const error = ref<string | null>(null)

const clearErrorAndSetPending = async (value: number | false = 2000) => {
  error.value = null
  isPending.value = true
  if (value) await delay(value)
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

  const getPost = async (id: number) => {
    try {
      await clearErrorAndSetPending(false)
      const { data, error: err } = await supabase
        .from('post')
        .select('id, title, text, created_at, profiles(id, username)')
        .eq('id', id)
        .single()
      if (err) throw err
      if (data) {
        const parsedData = PostWithProfileSchema.parse(data)
        post.value = parsedData
      }
      console.log(data)
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
        .single()
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

  const editPost = async (id: number) => {
    try {
      await clearErrorAndSetPending()
      console.log(id)
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }
  return {
    isPending,
    error,
    post,
    posts,
    addPost,
    deletePost,
    editPost,
    fetchPosts,
    getPost,
  }
}

export default usePost
