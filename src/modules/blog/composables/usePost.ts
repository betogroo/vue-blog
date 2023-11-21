import { ref } from 'vue'
import { useHelpers } from '@/shared/composables'
import { supabase } from '@/plugins/supabase'
import { type Post, PostsSchema } from '../types/Blog'

const posts = ref<Post[]>([])

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
      const { data, error: err } = await supabase.from('post').select()
      if (err) throw err
      if (data) {
        const parsedData = PostsSchema.parse(data)
        posts.value = parsedData
      }
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }
  return { isPending, error, posts, fetchPosts }
}

export default usePost
