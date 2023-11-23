<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { usePost } from '../composables'

interface Props {
  id: number
}
const props = defineProps<Props>()

const { getPost } = usePost()

onBeforeMount(async () => {
  await getPost(props.id)
})
</script>

<template>
  <div>Post - {{ id }}</div>
</template>
