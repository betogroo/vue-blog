<script setup lang="ts">
import BlogBtn from './btn/BlogBtn.vue'
import { useHelpers, useText } from '@/shared/composables'

import type { CommentWithProfile, PostWithProfile } from '../types/Blog'

interface Props {
  user_id: string
  post_id: number
  comment: CommentWithProfile
  post: PostWithProfile
}
defineProps<Props>()

const { timestampToDate } = useHelpers()
const { paragraph } = useText()
</script>

<template>
  <v-card
    class="py-2"
    variant="flat"
  >
    <v-card-text
      class="text-justify pa-2 mx-2 text-indent"
      tag="p"
    >
      <template
        v-for="(_paragraph, i) in paragraph(comment.text)"
        :key="i"
      >
        <p class="mb-2 text-indent">
          {{ _paragraph }}
        </p>
      </template>
    </v-card-text>
    <div class="d-flex justify-end align-center">
      <v-card-subtitle>
        {{ timestampToDate(comment.created_at!) }} por
        {{ comment.profiles.username }}
      </v-card-subtitle>

      <v-card-actions>
        <BlogBtn
          v-if="user_id === comment.profiles.id"
          color="warning"
          icon="mdi-pencil-outline"
          text="Editar"
          variant="elevated"
        />
        <BlogBtn
          v-if="user_id === comment.profiles.id || user_id === post.profiles.id"
          color="red"
          icon="mdi-delete-outline"
          text="Excluir"
          variant="outlined"
        />
      </v-card-actions>
    </div>
  </v-card>
</template>
