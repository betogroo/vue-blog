import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
/* import { useHelpers } from '@/shared/composables'
import { useBlogStore } from '../store/useBlogStore'
 */
/* import { type Comment } from '../types/Blog'

const comment = ref<Comment>() */
const comments = ref<Comment[][]>([])

const useComment = () => {
  const getComment = async (post_id: number) => {
    try {
      //error.value = null
      //isPending.value = true
      const { data, error: err } = await supabase
        .from('comments')
        .select('*')
        .eq('id', post_id)
      if (err) throw err
      console.log(data)
    } catch (err) {
      const e = err as Error
      console.log(e)
    } finally {
      //isPending.value = false
    }
  }

  return { getComment }
}

export default useComment
