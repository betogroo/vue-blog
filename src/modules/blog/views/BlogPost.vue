<script setup lang="ts">
interface Props {
  id: number
}
const props = defineProps<Props>()
</script>

<template>
  <div>Post - {{ id }}</div>
</template>
