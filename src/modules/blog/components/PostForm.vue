<script setup lang="ts">
import { type Post, validationPostSchema } from '../types/Blog'
import { useField, useForm } from 'vee-validate'
interface Props {
  isPending?: string | boolean
}
withDefaults(defineProps<Props>(), {
  isPending: false,
})

const emit = defineEmits<{
  submitPost: [post: Post]
}>()

const { values, handleSubmit, meta } = useForm<Post>({
  validationSchema: validationPostSchema,
})

const title = useField('title', validationPostSchema)
const text = useField('text', validationPostSchema)

const onSubmit = handleSubmit(async () => {
  emit('submitPost', values)
})
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <v-row no-gutters>
      <v-col cols="12">
        <v-text-field
          v-model="title.value.value"
          :error-messages="title.errorMessage.value"
          label="Assunto"
          placeholder="Digite o assunto"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="text.value.value"
          clearable
          :counter="5000"
          :error-messages="text.errorMessage.value"
          label="Texto"
          variant="outlined"
        >
        </v-textarea>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn
          class="text-right"
          color="black"
          :disabled="!meta.valid"
          :loading="isPending === 'addPost'"
          type="submit"
          >Enviar</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>
