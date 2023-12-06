<script setup lang="ts">
import { DataActions } from '.'
import { useHelpers, useText } from '@/shared/composables'

import type { CommentWithProfile, PostWithProfile } from '../types/Blog'

interface Props {
  user_id: string
  post_id: number
  comment: CommentWithProfile
  post: PostWithProfile
  isPending?: string | boolean
  indexPending?: boolean
}
withDefaults(defineProps<Props>(), {
  isPending: false,
})

const emit = defineEmits<{
  handleDelete: [id: number | string]
  handleEdit: [id: number | string]
}>()
const { timestampToDate } = useHelpers()
const { paragraph } = useText()

const handleDelete = (id: number | string) => {
  emit('handleDelete', id)
}
const handleEdit = (id: number | string) => {
  emit('handleEdit', id)
}
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
        <DataActions
          :id="post_id"
          :is-delete-pending="isPending === 'deleteComment' && indexPending"
          :is-delete-visible="
            user_id === comment.profiles.id || user_id === post.profiles.id
          "
          :is-edit-pending="isPending === 'editComment' && indexPending"
          :is-edit-visible="user_id === comment.profiles.id"
          @handle-delete="(id: string | number) => handleDelete(id)"
          @handle-edit="(id: string | number) => handleEdit(id)"
        />
      </v-card-actions>
    </div>
  </v-card>
</template>
