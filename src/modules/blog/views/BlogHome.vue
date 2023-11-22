<script setup lang="ts">
import { PostForm, PostCard } from '../components'
import { Post } from '../types/Blog'
import { usePost } from '../composables'
import { onBeforeMount, ref } from 'vue'
import { useProfileStore } from '@/modules/auth/store/useProfileStore'

const indexLoading = ref<number | string>(-1)

const {
  addPost,
  deletePost: _deletePost,
  fetchPosts,
  isPending: postPending,
  posts,
} = usePost()
const profileStore = useProfileStore()

const submitPost = async (post: Post) => {
  indexLoading.value = 'submitPost'
  const user_id = profileStore.userProfile.id
  try {
    await addPost(post, user_id)
  } catch (err) {
    console.log('BlogHome', err)
  }
}

const deletePost = async (id: number) => {
  indexLoading.value = posts.value.findIndex((item) => item.id === id)
  try {
    await _deletePost(id)
    indexLoading.value = -1
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
      v-for="(post, i) in posts"
      :key="post.id!"
      :is-pending="postPending && i === indexLoading"
      :post="post"
      :user_id="profileStore.userProfile.id"
      @handle-delete="(id) => deletePost(id)"
    />
    <PostForm
      :is-pending="postPending && indexLoading === 'submitPost'"
      @submit-post="(post) => submitPost(post)"
    />
  </v-container>
</template>
