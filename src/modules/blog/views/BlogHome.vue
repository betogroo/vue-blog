<script setup lang="ts">
import { PostForm, PostCard } from '../components'
import { Post } from '../types/Blog'
import { usePost } from '../composables'
import { onBeforeMount } from 'vue'
import { useProfileStore } from '@/modules/auth/store/useProfileStore'

const { fetchPosts, addPost, isPending: fetchPostsPending, posts } = usePost()
const profileStore = useProfileStore()

const submitPost = async (post: Post) => {
  const user_id = profileStore.userProfile.id
  try {
    await addPost(post, user_id)
  } catch (err) {
    console.log('BlogHome', err)
  }
}
onBeforeMount(async () => {
  await fetchPosts()
})
</script>
<template>
  <v-container class="d-flex flex-column justify-center">
    <h1 class="text-center text-h3">VuetiFlog - HOME PAGE</h1>
    <PostCard
      v-for="post in posts"
      :key="post.id!"
      :post="post"
    />
    <PostForm @submit-post="(post) => submitPost(post)" />
  </v-container>
</template>
