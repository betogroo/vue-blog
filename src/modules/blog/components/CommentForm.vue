<script setup lang="ts">
import { type Comment, validationCommentSchema } from '../types/Blog'
import { useField, useForm } from 'vee-validate'
interface Props {
  isPending?: boolean
}
withDefaults(defineProps<Props>(), {
  isPending: false,
})

const emit = defineEmits<{
  submitComment: [comment: Comment]
}>()

const { values, handleSubmit, meta } = useForm<Comment>({
  validationSchema: validationCommentSchema,
})

const text = useField('text', validationCommentSchema)

const onSubmit = handleSubmit(async () => {
  emit('submitComment', values)
})
</script>

<template>
  <v-form class="d-flex">
    <v-textarea
      v-model="text.value.value"
      auto-grow
      class="pa-1"
      :counter="2000"
      :error-messages="text.errorMessage.value"
      label="Comentário"
      rows="2"
      single-line
      variant="outlined"
    >
      <template #append-inner>
        <v-btn
          color="black"
          :disabled="!meta.valid"
          :loading="isPending"
          @click="onSubmit"
          >Enviar</v-btn
        ></template
      >
    </v-textarea>
  </v-form>
</template>
