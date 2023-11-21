<script setup lang="ts">
import { PostForm, PostCard } from '../components'
import { Post } from '../types/Blog'
import { usePost } from '../composables'
import { onBeforeMount } from 'vue'
import { useProfileStore } from '@/modules/auth/store/useProfileStore'

const {
  addPost,
  deletePost: _deletePost,
  fetchPosts,
  isPending: fetchPostsPending,
  posts,
} = usePost()
const profileStore = useProfileStore()

const submitPost = async (post: Post) => {
  const user_id = profileStore.userProfile.id
  try {
    await addPost(post, user_id)
  } catch (err) {
    console.log('BlogHome', err)
  }
}

const deletePost = async (id: number) => {
  try {
    await _deletePost(id)
  } catch (error) {
    console.error('deletePost', error)
  }
}
onBeforeMount(async () => {
  await fetchPosts()
})
</script>
<template>
  <v-container class="d-flex flex-column justify-center">
    <h1 class="text-center text-h3">VuetiFlog - HOME PAGE</h1>
    <h1 v-if="!posts.length">Nada a mostrar</h1>
    <PostCard
      v-for="post in posts"
      :key="post.id!"
      :post="post"
      @handle-delete="(id) => deletePost(id)"
    />
    <PostForm
      :is-pending="fetchPostsPending"
      @submit-post="(post) => submitPost(post)"
    />
  </v-container>
</template>
