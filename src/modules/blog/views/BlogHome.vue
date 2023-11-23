<script setup lang="ts">
import { PostCard } from '../components'
import { usePost } from '../composables'
import { ref } from 'vue'
import { useProfileStore } from '@/modules/auth/store/useProfileStore'

const indexLoading = ref<number | string>(-1)

const {
  deletePost: _deletePost,
  editPost: _editPost,
  fetchPosts,
  isPending: postPending,
  posts,
} = usePost()
const profileStore = useProfileStore()

const deletePost = async (id: number) => {
  indexLoading.value = posts.value.findIndex((item) => item.id === id)
  try {
    await _deletePost(id)
    indexLoading.value = -1
  } catch (error) {
    console.error('deletePost', error)
  }
}

const editPost = async (id: number) => {
  await _editPost(id)
}

await fetchPosts()
</script>
<template>
  <v-container class="d-flex flex-column justify-center">
    <h1 v-show="!posts.length">Nada a mostrar</h1>
    <v-card
      class="text-right px-3"
      variant="text"
    >
      <v-btn
        class="text-none"
        color="success"
        prepend-icon="mdi-plus"
        :to="{ name: 'PostAdd' }"
        >Novo Post</v-btn
      >
    </v-card>
    <PostCard
      v-for="(post, i) in posts"
      :key="post.id!"
      :is-pending="postPending && i === indexLoading"
      :post="post"
      :user_id="profileStore.userProfile.id"
      @handle-delete="(id) => deletePost(id)"
      @handle-edit="(id) => editPost(id)"
    />
  </v-container>
</template>
