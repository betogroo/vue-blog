import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import {
  type CommentWithProfile,
  type Comment,
  CommentsWithProfileSchema,
} from '../types/Blog'
import { useHelpers } from '@/shared/composables'

const comments = ref<CommentWithProfile[]>([])

const { delay: _delay, handleError } = useHelpers()

const isPending = ref<string | false>(false)
const error = ref<string | null>(null)

const clearErrorAndSetPending = async (action: string, delay = false) => {
  error.value = null
  isPending.value = action
  if (delay) await _delay()
}

const useComment = () => {
  const fetchComments = async (post_id: number) => {
    try {
      //error.value = null
      //isPending.value = true
      const { data, error: err } = await supabase
        .from('comments')
        .select('*, profiles(id, username)')
        .eq('post_id', post_id)
        .order('created_at', { ascending: false })
      if (err) throw err
      if (data) {
        const parsedData = CommentsWithProfileSchema.parse(data)
        console.log(data)
        comments.value = parsedData
      }
    } catch (err) {
      const e = err as Error
      console.log(e)
    } finally {
      //isPending.value = false
    }
  }

  const addComment = async (
    comment: Comment,
    user_id: string,
    post_id: number,
  ) => {
    try {
      const commentData = { ...comment, user_id, post_id }
      await clearErrorAndSetPending('addComment', true)
      const { data, error: err } = await supabase
        .from('comments')
        .insert(commentData)
        .select()
        .single()
      console.log(commentData)
      if (err || !data) {
        return
      }
      return data
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }

  return { addComment, fetchComments, comments, isPending }
}

export default useComment