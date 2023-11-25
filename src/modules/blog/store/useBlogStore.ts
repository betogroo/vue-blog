// Utilities
import { defineStore } from 'pinia'
import { PostWithProfile } from '../types/Blog'
import { ref } from 'vue'

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<PostWithProfile[]>([])

  return { posts }
})
