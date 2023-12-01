<script setup lang="ts">
import { usePost, useComment } from '../composables'
import { PostCard, PostComments, CommentForm } from '../components'
import { useProfileStore } from '@/modules/auth/store/useProfileStore'
import type { Comment } from '../types/Blog'
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

const {
  addComment: _addComment,
  fetchComments,
  comments,
  isPending: commentPending,
} = useComment()
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

const addComment = async (comment: Comment) => {
  indexPending.value = 0
  const user_id = profileStore.userProfile.id
  const post_id = props.id
  try {
    const data = await _addComment(comment, user_id, post_id)
    if (!data) throw Error('Não foi possível comentar.')
  } catch (err) {
    console.log('BlogHome', err)
  }
}

await getPost(props.id)
await fetchComments(props.id)
</script>

<template>
  <v-container v-if="post">
    <PostCard
      :index-pending="indexPending === 0"
      :is-complete="true"
      :is-pending="postPending"
      :post="post"
      :user_id="profileStore.userProfile.id"
      @handle-delete="deletePost(id)"
      @handle-edit="editPost(id)"
    />
    <CommentForm
      :is-pending="indexPending === 0 && commentPending === 'addComment'"
      @submit-comment="(comment) => addComment(comment)"
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
