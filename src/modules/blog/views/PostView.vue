<script setup lang="ts">
import { usePost, useComment } from '../composables'
import { PostCard, PostComments } from '../components'
import { useProfileStore } from '@/modules/auth/store/useProfileStore'
import { ref } from 'vue'

const props = defineProps<Props>()

interface Props {
  id: number
}

const indexPending = ref(-1)
const {
  getPost,
  isPending: postPending,
  post,
  deletePost: _deletePost,
  editPost: _editPost,
} = usePost()

const { getComment, comments } = useComment()
const profileStore = useProfileStore()

const deletePost = async (id: number) => {
  try {
    indexPending.value = 0
    await _deletePost(id)
  } catch (error) {
    console.error('deletePost', error)
  }
}

const editPost = async (id: number) => {
  indexPending.value = 0
  await _editPost(id)
}

const commentPost = () => {
  console.log('comment')
}

await getPost(props.id)
await getComment(props.id)
</script>

<template>
  <v-container v-if="post">
    <PostCard
      :index-pending="indexPending === 0"
      :is-complete="true"
      :is-pending="postPending"
      :post="post"
      :user_id="profileStore.userProfile.id"
      @handle-comment="commentPost"
      @handle-delete="deletePost(id)"
      @handle-edit="editPost(id)"
    />
    <div class="d-flex">
      <h2>Comentários</h2>
    </div>
    <PostComments
      v-for="comment in comments"
      :key="comment.id!"
      :comment="comment"
      :post="post"
      :post_id="id"
      :user_id="profileStore.userProfile.id"
    />
  </v-container>
  <v-container v-else> Este post nao existe </v-container>
</template>
