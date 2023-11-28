<script setup lang="ts">
import BlogBtn from './btn/BlogBtn.vue'
</script>

<template>
  <v-card variant="text">
    <v-card-text
      class="text-justify pa-2 mx-2 text-indent"
      tag="p"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eius
      minima, veritatis culpa asperiores quidem, tempora ex facilis voluptas
      eaque ducimus. Deleniti placeat, beatae maiores laboriosam commodi
      doloribus libero culpa?
    </v-card-text>
    <v-divider inset></v-divider>
    <v-card-actions class="justify-end align-center">
      <v-card-subtitle> 28/11/2023 por alibabá </v-card-subtitle>
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
