<script setup lang="ts">
import { toRefs } from 'vue'
import { PostWithProfile } from '../types/Blog'
import { useHelpers } from '@/shared/composables'

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
            class="d-flex justify-center justify-sm-end align-center"
          >
            <v-btn
              color="warning"
              :loading="isPending"
              prepend-icon="mdi-pencil-outline"
              variant="elevated"
              @click="handleEdit(id!)"
            >
              Editar</v-btn
            >
            <v-btn
              color="red"
              :loading="isPending"
              prepend-icon="mdi-delete-outline"
              variant="outlined"
              @click="handleDelete(id!)"
              >Excluir</v-btn
            >
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card-item>

    <v-card-text class="text-indent text-justify pa-2">{{ text }}</v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.text-indent {
  text-indent: 3rem;
}
</style>
