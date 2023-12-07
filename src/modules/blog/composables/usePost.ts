import { ref } from 'vue'
import { useHelpers } from '@/shared/composables'
import { supabase } from '@/plugins/supabase'
import { useBlogStore } from '../store/useBlogStore'
import { useFeedbackStore } from '@/shared/store/useFeedbackStore'

import {
  type PostWithProfile,
  type Post,
  PostsWithProfileSchema,
  PostWithProfileSchema,
} from '../types/Blog'
import { storeToRefs } from 'pinia'

const posts = ref<PostWithProfile[]>([])
const post = ref<PostWithProfile>()

const { handleError } = useHelpers()

const usePost = () => {
  const blogStore = useBlogStore()
  const feedbackStore = useFeedbackStore()

  const { error, isPending } = storeToRefs(feedbackStore)

  const fetchPosts = async () => {
    try {
      await feedbackStore.clearErrorAndSetPending('fetchPosts')
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
      feedbackStore.error = handleError(err)
    } finally {
      feedbackStore.isPending = false
    }
  }

  const getPost = async (id: number) => {
    try {
      await feedbackStore.clearErrorAndSetPending('getPost')
      const { data, error: err } = await supabase
        .from('post')
        .select('*, profiles(id, username)')
        .eq('id', id)
        .returns<PostWithProfile[]>()
        .single()
      if (err) throw err
      if (data) {
        const parsedData = PostWithProfileSchema.parse(data)
        post.value = parsedData
        return data
      }
    } catch (err) {
      feedbackStore.error = handleError(err)
    } finally {
      feedbackStore.isPending = false
    }
  }

  const addPost = async (post: Post, user_id: string) => {
    try {
      const postData = { ...post, user_id }
      await feedbackStore.clearErrorAndSetPending('addPost')
      const { data, error: err } = await supabase
        .from('post')
        .insert(postData)
        .select()
        .returns<Post[]>()
        .single()
      if (err || !data) throw Error('Não foi possível postar')
      console.log(data)
      return data
    } catch (err) {
      feedbackStore.error = handleError(err)
    } finally {
      feedbackStore.isPending = false
    }
  }
  const deletePost = async (id: number) => {
    try {
      await feedbackStore.clearErrorAndSetPending('deletePost')
      const { error: err } = await supabase.from('post').delete().eq('id', id)
      if (err) throw err
      return true
      //await fetchPosts()
    } catch (err) {
      feedbackStore.error = handleError(err)
    } finally {
      feedbackStore.isPending = false
    }
  }

  const editPost = async (id: number) => {
    try {
      await feedbackStore.clearErrorAndSetPending('editPost', true)
      console.log(id)
    } catch (err) {
      feedbackStore.error = handleError(err)
    } finally {
      feedbackStore.isPending = false
    }
  }
  return {
    error,
    isPending,
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
