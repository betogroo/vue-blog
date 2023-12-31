<script setup lang="ts">
import { PostCard, PostForm } from '../components'
import { usePost } from '../composables'
import { ref } from 'vue'
import { useBlogStore } from '../store/useBlogStore'
import { useProfileStore } from '@/modules/auth/store/useProfileStore'
import { AppDialogFull, BtnOrIcon } from '@/shared/components'
import { type Post } from '../types/Blog'

//reactive
const indexPending = ref<number | string>(-1)
const dialog = ref(false)
const dialogAction = ref<string>('')

// composable
const {
  deletePost: _deletePost,
  editPost: _editPost,
  fetchPosts,
  addPost,
  isPending: postPending,
  posts,
  post: _post,
  getPost,
} = usePost()

// store
const blogStore = useBlogStore()
const profileStore = useProfileStore()

const deletePost = async (id: number | string) => {
  indexPending.value = posts.value.findIndex((item) => item.id === id)
  try {
    const isDeleted = await _deletePost(+id)
    if (isDeleted) {
      await fetchPosts()
      indexPending.value = -1
    }
  } catch (error) {
    console.error('deletePost', error)
  }
}

const editPost = async (post: Post) => {
  try {
    const data = await _editPost(post)
    if (!data) throw Error('Não foi possível Editar.')
    blogStore.$resetPosts()
    await fetchPosts()
    toggleDialog('')
  } catch (error) {
    console.log(error)
  }
}

const submitPost = async (post: Post) => {
  indexPending.value = 'submitPost'
  const user_id = profileStore.userProfile.id
  try {
    const data = await addPost(post, user_id)
    if (!data) throw Error('Não foi possível postar.')
    await fetchPosts()
    toggleDialog('')
  } catch (err) {
    console.log('BlogHome', err)
  }
}

const toggleEditPost = async (id: number) => {
  await getPost(id)
  toggleDialog('editPost')
}
const toggleDialog = (action: string) => {
  dialogAction.value = action
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
      ><BtnOrIcon
        icon="mdi-plus"
        text="Novo Post"
        @handle-click="toggleDialog('submitPost')"
      />
    </v-card>
    <PostCard
      v-for="(post, i) in blogStore.posts"
      :key="post.id!"
      :index-pending="indexPending === i"
      :is-pending="postPending"
      :post="post"
      :user_id="profileStore.userProfile.id"
      @handle-delete="(id) => deletePost(id)"
      @handle-edit="(id) => toggleEditPost(+id)"
    />
  </v-container>
  <AppDialogFull
    v-model="dialog"
    :title="dialogAction === 'submitPost' ? 'Novo Post' : 'Editar post'"
  >
    <PostForm
      v-if="dialogAction === 'submitPost'"
      :is-pending="postPending"
      @submit-post="(post) => submitPost(post)"
    />
    <PostForm
      v-else
      :is-pending="postPending"
      :post="_post"
      @submit-post="(post) => editPost(post)"
    />
  </AppDialogFull>
</template>
