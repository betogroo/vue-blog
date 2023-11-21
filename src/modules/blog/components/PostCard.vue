<script setup lang="ts">
import { toRefs } from 'vue'
import { PostWithProfile } from '../types/Blog'

interface Props {
  post: PostWithProfile
}
const props = defineProps<Props>()
const { id, title, created_at, text, profiles } = toRefs(props.post)
</script>

<template>
  <v-card class="ma-2 pa-3">
    <v-card-title>{{ title }} de {{ profiles.username }}</v-card-title>
    <v-card-subtitle>{{ created_at }}</v-card-subtitle>
    <v-card-text>{{ text }}</v-card-text>
  </v-card>
</template>
