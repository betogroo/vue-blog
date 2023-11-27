<script setup lang="ts">
import { toRefs } from 'vue'
import BlogBtn from './btn/BlogBtn.vue'
import { PostWithProfile } from '../types/Blog'
import { useHelpers } from '@/shared/composables'

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
  handleDelete: [id: number]
  handleEdit: [id: number]
}>()

const { id, title, created_at, text, profiles } = toRefs(props.post)
const { timestampToDate } = useHelpers()

const handleDelete = (id: number) => {
  emit('handleDelete', id)
}
const handleEdit = (id: number) => {
  emit('handleEdit', id)
}
</script>

<template>
  <v-card
    class="ma-2 pa-3"
    color="primary"
    variant="tonal"
  >
    <v-card-item>
      <v-row>
        <v-col sm="6">
          <v-card-title>{{ title }}</v-card-title>
          <v-card-subtitle
            >{{ timestampToDate(created_at!) }} por {{ profiles.username }}
          </v-card-subtitle>
        </v-col>
        <v-col>
          <v-card-actions
            v-if="user_id === post.profiles.id"
            class="d-flex justify-end align-center"
          >
            <BlogBtn
              color="warning"
              icon="mdi-pencil-outline"
              :loading="isPending === 'editPost' && indexPending"
              text="Editar"
              variant="elevated"
              @handle-click="handleEdit(id!)"
            />
            <BlogBtn
              color="red"
              icon="mdi-delete-outline"
              :loading="isPending === 'deletePost' && indexPending"
              text="Editar"
              variant="outlined"
              @handle-click="handleDelete(id!)"
            />
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card-item>

    <v-card-text class="text-indent text-justify pa-2">{{ text }}</v-card-text>
    <v-card-actions class="justify-end">
      <v-btn
        v-if="!isComplete"
        class="text-none"
        color="primary"
        :ripple="false"
        :to="{ name: 'PostView', params: { id: post.id } }"
        >Ler mais</v-btn
      >
      <v-btn
        v-else
        class="text-none"
        color="primary"
        :ripple="false"
        :to="{ name: 'BlogHome' }"
        >Voltar</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
.text-indent {
  text-indent: 3rem;
}
</style>
