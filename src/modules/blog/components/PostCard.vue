<script setup lang="ts">
import { toRefs } from 'vue'
import { PostWithProfile } from '../types/Blog'

interface Props {
  post: PostWithProfile
  user_id: string
  isPending?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isPending: false,
})

const emit = defineEmits<{
  handleDelete: [id: number]
}>()

const { id, title, created_at, text, profiles } = toRefs(props.post)

const handleDelete = (id: number) => {
  emit('handleDelete', id)
}
</script>

<template>
  <v-card class="ma-2 pa-3">
    <v-card-title>{{ title }} de {{ profiles.username }}</v-card-title>
    <v-card-subtitle>{{ created_at }}</v-card-subtitle>
    <v-card-text>{{ text }}</v-card-text>
    <v-card-actions>
      <v-btn
        v-if="user_id === post.profiles.id"
        :loading="isPending"
        @click="handleDelete(id!)"
        >Excluir</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
