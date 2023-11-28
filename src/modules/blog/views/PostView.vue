<script setup lang="ts">
import { usePost } from '../composables'
import { PostCard, PostComments } from '../components'
import { useProfileStore } from '@/modules/auth/store/useProfileStore'

const props = defineProps<Props>()

interface Props {
  id: number
}
const { getPost, post } = usePost()
const profileStore = useProfileStore()
const comments = 5

await getPost(props.id)
</script>

<template>
  <v-container>
    <PostCard
      v-if="post"
      :is-complete="true"
      :post="post"
      :user_id="profileStore.userProfile.id"
    />
    <div class="d-flex justify-space-around">
      <h2>Comentários</h2>
      <v-btn variant="plain">Comentar</v-btn>
    </div>
    <PostComments
      v-for="item in comments"
      :key="item"
    />
  </v-container>
</template>
