<script setup lang="ts">
import { ref } from 'vue'
import type { Post } from '../types/Blog'
import { PostForm } from '../components'
import { usePost } from '../composables'
import { useRouter } from 'vue-router'
import { useProfileStore } from '@/modules/auth/store/useProfileStore'

const indexLoading = ref<number | string>(-1)

const router = useRouter()
const { addPost, isPending } = usePost()
const profileStore = useProfileStore()
const submitPost = async (post: Post) => {
  indexLoading.value = 'submitPost'
  const user_id = profileStore.userProfile.id
  try {
    const data = await addPost(post, user_id)
    if (!data) throw Error('Não foi possível postar.')
    router.push({ name: 'PostView', params: { id: data.id } })
  } catch (err) {
    console.log('BlogHome', err)
  }
}
</script>

<template>
  <v-container>
    <PostForm
      :is-pending="isPending && indexLoading === 'submitPost'"
      @submit-post="(post) => submitPost(post)"
    />
  </v-container>
</template>
