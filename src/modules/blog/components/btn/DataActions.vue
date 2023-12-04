<script setup lang="ts">
import { BtnOrIcon } from '@/shared/components/'
interface Props {
  isEditPending?: boolean
  isDeletePending?: boolean
  isEditVisible?: boolean
  isDeleteVisible?: boolean
  id: string | number
}
const props = withDefaults(defineProps<Props>(), {
  isEditPending: false,
  isDeletePending: false,
  isEditVisible: true,
  isDeleteVisible: true,
})

const emit = defineEmits<{
  handleEdit: [id: string | number]
  handleDelete: [id: string | number]
}>()

const handleEdit = (id: typeof props.id) => {
  emit('handleEdit', id)
}
const handleDelete = (id: typeof props.id) => {
  emit('handleDelete', id)
}
</script>

<template>
  <BtnOrIcon
    v-if="isEditVisible"
    color="warning"
    icon="mdi-pencil-outline"
    :loading="isEditPending"
    text="Editar"
    variant="elevated"
    @handle-click="handleEdit(id)"
  />
  <BtnOrIcon
    v-if="isDeleteVisible"
    color="red"
    icon="mdi-delete-outline"
    :loading="isDeletePending"
    text="Excluir"
    variant="outlined"
    @handle-click="handleDelete(id)"
  />
</template>
