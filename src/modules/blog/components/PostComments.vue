<script setup lang="ts">
import BlogBtn from './btn/BlogBtn.vue'
import { useHelpers, useText } from '@/shared/composables'

import type { CommentWithProfile } from '../types/Blog'

interface Props {
  comment: CommentWithProfile
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
    <v-card-actions class="justify-end align-center">
      <v-card-subtitle>
        {{ timestampToDate(comment.created_at!) }} por
        {{ comment.profiles.username }}
      </v-card-subtitle>
      <BlogBtn
        color="warning"
        icon="mdi-pencil-outline"
        text="Editar"
        variant="elevated"
      />
      <BlogBtn
        color="red"
        icon="mdi-delete-outline"
        text="Excluir"
        variant="outlined"
      />
    </v-card-actions>
  </v-card>
</template>
