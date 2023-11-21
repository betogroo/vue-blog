<script setup lang="ts">
import { PostForm } from '../components'
import { Post } from '../types/Blog'

const submitPost = (post: Post) => {
  console.log(post)
}
</script>
<template>
  <v-container class="d-flex justify-center">
    <div class="ma-2 pa-3">
      <h1 class="text-center text-h3">VuetiFlog - HOME PAGE</h1>
      <PostForm @submit-post="(post) => submitPost(post)" />
    </div>
  </v-container>
</template>
