import { ref } from 'vue'
import { useHelpers } from '@/shared/composables'
import { supabase } from '@/plugins/supabase'
import { useBlogStore } from '../store/useBlogStore'
import {
  type PostWithProfile,
  type Post,
  PostsWithProfileSchema,
  PostWithProfileSchema,
} from '../types/Blog'

const posts = ref<PostWithProfile[]>([])
const post = ref<PostWithProfile>()

const { delay: _delay, handleError } = useHelpers()

const isPending = ref<string | false>(false)
const error = ref<string | null>(null)

const clearErrorAndSetPending = async (action: string, delay = false) => {
  error.value = null
  isPending.value = action
  if (delay) await _delay()
}

const usePost = () => {
  const blogStore = useBlogStore()
  const fetchPosts = async () => {
    try {
      await clearErrorAndSetPending('fetchPosts')
      const { data, error: err } = await supabase
        .from('post')
        .select('id, title, text, created_at, profiles(id, username)')
        .order('created_at', { ascending: false })
        .returns<PostWithProfile[]>()

      if (err) throw err
      if (data) {
        const parsedData = PostsWithProfileSchema.parse(data)
        posts.value = parsedData
        blogStore.posts = parsedData
      }
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }

  const getPost = async (id: number) => {
    try {
      await clearErrorAndSetPending('getPost')
      const { data, error: err } = await supabase
        .from('post')
        .select('id, title, text, created_at, profiles(id, username)')
        .eq('id', id)
        .returns<PostWithProfile>()
        .single()
      if (err) throw err
      if (data) {
        const parsedData = PostWithProfileSchema.parse(data)
        post.value = parsedData
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
      await clearErrorAndSetPending('addPost')
      const { data, error: err } = await supabase
        .from('post')
        .insert(postData)
        .select()
        .returns<Post>()
      if (err || !data) throw Error('Não foi possível postar')
      console.log(data)
      return data
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }
  const deletePost = async (id: number) => {
    try {
      await clearErrorAndSetPending('deletePost')
      const { error: err } = await supabase.from('post').delete().eq('id', id)
      if (err) throw err
      await fetchPosts()
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }

  const editPost = async (id: number) => {
    try {
      await clearErrorAndSetPending('editPost', true)
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
