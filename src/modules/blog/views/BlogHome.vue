<script setup lang="ts">
import { PostCard, PostForm } from '../components'
import { usePost } from '../composables'
import { ref } from 'vue'
import { useBlogStore } from '../store/useBlogStore'
import { useProfileStore } from '@/modules/auth/store/useProfileStore'
import AppDialogFull from '@/shared/components/app/AppDialogFull.vue'
import { Post } from '../types/Blog'

const indexLoading = ref<number | string>(-1)

const blogStore = useBlogStore()

const {
  deletePost: _deletePost,
  editPost: _editPost,
  fetchPosts,
  addPost,
  isPending: postPending,
  posts,
} = usePost()
const profileStore = useProfileStore()

const deletePost = async (id: number) => {
  indexLoading.value = posts.value.findIndex((item) => item.id === id)
  try {
    await _deletePost(id)
    indexLoading.value = -1
  } catch (error) {
    console.error('deletePost', error)
  }
}

const editPost = async (id: number) => {
  indexLoading.value = posts.value.findIndex((item) => item.id === id)
  await _editPost(id)
  indexLoading.value = -1
}

const submitPost = async (post: Post) => {
  indexLoading.value = 'submitPost'
  const user_id = profileStore.userProfile.id
  try {
    const data = await addPost(post, user_id)
    if (!data) throw Error('Não foi possível postar.')
    await fetchPosts()
    toggleDialog()
  } catch (err) {
    console.log('BlogHome', err)
  }
}

const dialog = ref(false)
const toggleDialog = () => {
  dialog.value = !dialog.value
}

await fetchPosts()
</script>
<template>
  <v-container class="d-flex flex-column justify-center">
    <h1 v-show="!blogStore.posts.length">Nada a mostrar</h1>
    <v-card
      class="text-right px-3"
      variant="text"
    >
      <AppDialogFull v-model="dialog">
        <PostForm
          :is-pending="postPending"
          @submit-post="(post) => submitPost(post)"
        />
      </AppDialogFull>
      <v-btn
        class="text-none"
        color="success"
        prepend-icon="mdi-plus"
        :to="{ name: 'PostAdd' }"
        >Novo Post</v-btn
      >
    </v-card>
    <PostCard
      v-for="(post, i) in blogStore.posts"
      :key="post.id!"
      :index-pending="indexLoading === i"
      :is-pending="postPending"
      :post="post"
      :user_id="profileStore.userProfile.id"
      @handle-delete="(id) => deletePost(id)"
      @handle-edit="(id) => editPost(id)"
    />
  </v-container>
</template>
