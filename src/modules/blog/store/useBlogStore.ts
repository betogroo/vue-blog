// Utilities
import { defineStore } from 'pinia'
import { PostWithProfile, CommentWithProfile } from '../types/Blog'
import { ref } from 'vue'

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<PostWithProfile[]>([])
  const comments = ref<CommentWithProfile[]>([])

  const $resetPosts = () => {
    posts.value = []
  }
  const $resetComments = () => {
    comments.value = []
  }

  return { posts, comments, $resetPosts, $resetComments }
})
