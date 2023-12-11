<script setup lang="ts">
import { toRefs } from 'vue'
import { DataActions } from './'
import { PostWithProfile } from '../types/Blog'
import { useHelpers, useText } from '@/shared/composables'

interface Props {
  post: PostWithProfile
  user_id: string
  isPending?: string | boolean
  indexPending?: boolean
  isComplete?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isPending: false,
  isComplete: false,
})

const emit = defineEmits<{
  handleDelete: [id: number | string]
  handleEdit: [id: number | string]
}>()

const { id, title, created_at, text, profiles, updated_at } = toRefs(props.post)
const { timestampToDate } = useHelpers()
const { limitText, paragraph } = useText()

const handleDelete = (id: number | string) => {
  emit('handleDelete', id)
}
const handleEdit = (id: number | string) => {
  emit('handleEdit', id)
}
</script>

<template>
  <v-card
    class="my-1"
    :variant="isComplete ? 'text' : 'outlined'"
  >
    <v-card-item class="ml-2 pt-0">
      <v-row
        align="center"
        no-gutters
      >
        <v-col cols="6">
          <v-card-title>{{ title }}</v-card-title>
        </v-col>
        <v-col>
          <v-card-actions
            v-if="user_id === post.profiles.id"
            class="d-flex justify-end align-center ma-0 pa-0"
          >
            <DataActions
              :id="+id!"
              :is-delete-pending="isPending === 'deletePost' && indexPending"
              :is-edit-pending="isPending === 'editPost' && indexPending"
              @handle-delete="(id) => handleDelete(id)"
              @handle-edit="(id) => handleEdit(id)"
            />
          </v-card-actions>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-card-subtitle
            >Criado em {{ timestampToDate(created_at!) }} por
            {{ profiles.username }}
            <span v-if="updated_at">
              - editado em {{ timestampToDate(updated_at!) }}
            </span>
          </v-card-subtitle>
        </v-col>
      </v-row>
    </v-card-item>
    <v-card-text class="text-justify pa-1 mx-2">
      <template v-if="isComplete">
        <template
          v-for="(_paragraph, i) in paragraph(text)"
          :key="i"
        >
          <p class="mb-2 text-indent">
            {{ _paragraph }}
          </p>
        </template>
      </template>
      <template v-else>
        <p>{{ limitText(text, 500) }} ...</p>
      </template>
    </v-card-text>
    <v-card-actions class="pa-0 mr-2 justify-end">
      <template v-if="!isComplete">
        <v-btn
          class="text-none"
          color="black"
          :ripple="false"
          :to="{ name: 'PostView', params: { id: post.id } }"
          >Ver post completo</v-btn
        >
      </template>
      <template v-else>
        <v-btn
          class="text-none"
          color="black"
          :ripple="false"
          :to="{ name: 'BlogHome' }"
          >Voltar</v-btn
        >
      </template>
    </v-card-actions>
  </v-card>
</template>
