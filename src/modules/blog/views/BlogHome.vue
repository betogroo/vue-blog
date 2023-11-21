<script setup lang="ts">
import { PostForm } from '../components'
import { Post } from '../types/Blog'
import { usePost } from '../composables'

const { error, fetchPosts, isPending: fetchPostsPending, posts } = usePost()

const submitPost = (post: Post) => {
  console.log(post)
}

await fetchPosts()
</script>
<template>
  <v-container class="d-flex justify-center">
    <div>
      <div
        v-if="!fetchPostsPending"
        class="ma-2 pa-3"
      >
        <h1 class="text-center text-h3">VuetiFlog - HOME PAGE</h1>
        <div>{{ posts }}</div>
        <PostForm @submit-post="(post) => submitPost(post)" />
      </div>
      <div
        v-else
        v-show="fetchPostsPending"
        class="mt-8 bg-red"
      >
        Loading
      </div>
    </div>
  </v-container>
</template>
