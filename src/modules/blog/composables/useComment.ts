import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import {
  type CommentWithProfile,
  CommentsWithProfileSchema,
} from '../types/Blog'
/* import { useHelpers } from '@/shared/composables'
import { useBlogStore } from '../store/useBlogStore'
 */
/* import { type Comment } from '../types/Blog'

const comment = ref<Comment>() */
const comments = ref<CommentWithProfile[]>([])

const useComment = () => {
  const getComment = async (post_id: number) => {
    try {
      //error.value = null
      //isPending.value = true
      const { data, error: err } = await supabase
        .from('comments')
        .select('*, profiles(id, username)')
        .eq('post_id', post_id)
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

  return { getComment, comments }
}

export default useComment
