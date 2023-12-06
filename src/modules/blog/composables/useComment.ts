import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import {
  type CommentWithProfile,
  type Comment,
  CommentsWithProfileSchema,
} from '../types/Blog'
import { useHelpers } from '@/shared/composables'

import { useBlogStore } from '../store/useBlogStore'
import { useFeedbackStore } from '@/shared/store/useFeedbackStore'
import { storeToRefs } from 'pinia'

const comments = ref<CommentWithProfile[]>([])
const { handleError } = useHelpers()

const useComment = () => {
  const blogStore = useBlogStore()
  const feedbackStore = useFeedbackStore()

  const { error, isPending } = storeToRefs(feedbackStore)

  const fetchComments = async (post_id: number) => {
    try {
      await feedbackStore.clearErrorAndSetPending('fetchComments')
      const { data, error: err } = await supabase
        .from('comments')
        .select('*, profiles(id, username)')
        .eq('post_id', post_id)
        .order('created_at', { ascending: false })
        .returns<CommentWithProfile[]>()
      if (err) throw err
      if (data) {
        const parsedData = CommentsWithProfileSchema.parse(data)
        comments.value = parsedData
        blogStore.comments = parsedData
      }
    } catch (err) {
      const e = err as Error
      console.log(e)
    } finally {
      feedbackStore.isPending = false
    }
  }

  const addComment = async (
    comment: Comment,
    user_id: string,
    post_id: number,
  ) => {
    try {
      const commentData = { ...comment, user_id, post_id }
      await feedbackStore.clearErrorAndSetPending('addComment', true)
      const { data, error: err } = await supabase
        .from('comments')
        .insert(commentData)
        .select()
        .returns<Comment>()
      if (err || !data) {
        return
      }
      return data
    } catch (err) {
      feedbackStore.error = handleError(err)
    } finally {
      feedbackStore.isPending = false
    }
  }

  const editComment = async (id: number | string) => {
    try {
      await feedbackStore.clearErrorAndSetPending('editComment', true)
      console.log('Vai editar o', id)
    } catch (err) {
      feedbackStore.error = handleError(err)
    } finally {
      feedbackStore.isPending = false
    }
  }
  const deleteComment = async (id: number | string) => {
    try {
      await feedbackStore.clearErrorAndSetPending('deleteComment', true)
      const { error: err } = await supabase
        .from('comments')
        .delete()
        .eq('id', id)
      if (err) throw err
      return true
    } catch (err) {
      feedbackStore.error = handleError(err)
    } finally {
      feedbackStore.isPending = false
    }
  }

  return {
    comments,
    error,
    isPending,
    addComment,
    deleteComment,
    editComment,
    fetchComments,
  }
}

export default useComment
