import { ref } from 'vue'
/* import { useHelpers } from '@/shared/composables'
import { supabase } from '@/plugins/supabase'
import { useBlogStore } from '../store/useBlogStore'
 */
/* import { type Comment } from '../types/Blog'

const comments = ref<Comment[][]>([])
const comment = ref<Comment>() */

const useComment = () => {
  const getComment = async (post_id: number) => {
    console.log(post_id)
  }

  return { getComment }
}

export default useComment
