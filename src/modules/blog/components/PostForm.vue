<script setup lang="ts">
const onSubmit = () => {
  console.log('Post')
}
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <v-row no-gutters>
      <v-col cols="12">
        <v-text-field
          label="Assunto"
          placeholder="Digite o assunto"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          clearable
          label="Label"
          variant="outlined"
        ></v-textarea>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn
          class="text-right"
          type="submit"
          >Enviar</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>
