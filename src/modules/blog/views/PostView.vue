<script setup lang="ts">
import { usePost } from '../composables'
import { PostCard } from '../components'
import { useProfileStore } from '@/modules/auth/store/useProfileStore'

interface Props {
  id: number
}
const props = defineProps<Props>()

const { getPost, post } = usePost()
const profileStore = useProfileStore()

await getPost(props.id)
</script>

<template>
  <PostCard
    v-if="post"
    :is-complete="true"
    :post="post"
    :user_id="profileStore.userProfile.id"
  />
</template>