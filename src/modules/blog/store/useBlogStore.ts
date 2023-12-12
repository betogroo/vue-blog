// Utilities
import { defineStore } from 'pinia'
import { PostWithProfile, CommentWithProfile } from '../types/Blog'
import { ref } from 'vue'

export const useBlogStore = defineStore('blog', () => {
  const post = ref<PostWithProfile>()
  const posts = ref<PostWithProfile[]>([])
  const comments = ref<CommentWithProfile[]>([])

  const $resetPosts = () => {
    posts.value = []
  }
  const $resetPost = () => {
    post.value = undefined
  }
  const $resetComments = () => {
    comments.value = []
  }

  return { post, posts, comments, $resetPosts, $resetComments, $resetPost }
})
