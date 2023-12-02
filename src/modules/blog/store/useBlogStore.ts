// Utilities
import { defineStore } from 'pinia'
import { PostWithProfile, CommentWithProfile } from '../types/Blog'
import { ref } from 'vue'

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<PostWithProfile[]>([])
  const comments = ref<CommentWithProfile[]>([])

  return { posts, comments }
})
