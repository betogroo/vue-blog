<script setup lang="ts">
import { usePost, useComment } from '../composables'
import { useRouter } from 'vue-router'
import { PostCard, CommentCard, CommentForm } from '../components'
import { useBlogStore } from '../store/useBlogStore'
import { useProfileStore } from '@/modules/auth/store/useProfileStore'
import type { Comment } from '../types/Blog'
import { ref } from 'vue'

const props = defineProps<Props>()

interface Props {
  id: number
}

// composable
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
  editComment: _editComment,
  deleteComment: _deleteComment,
  isPending: commentPending,
} = useComment()

const { push } = useRouter()

//store
const profileStore = useProfileStore()
const blogStore = useBlogStore()

const deletePost = async (id: number) => {
  try {
    indexPending.value = 0
    const isDeleted = await _deletePost(id)
    if (isDeleted) {
      alert('Foi deletado, vamos fazer uma coisa bonitinha depois')
      push({ name: 'BlogHome' })
    }
  } catch (error) {
    console.error('deletePost', error)
  }
}

const editPost = async (id: number) => {
  indexPending.value = 0
  await _editPost(id)
}
const editComment = async (id: number | string) => {
  indexPending.value = blogStore.comments.findIndex((item) => item.id === id)
  await _editComment(id)
}
const deleteComment = async (id: number | string) => {
  indexPending.value = blogStore.comments.findIndex((item) => item.id === id)
  try {
    if (await _deleteComment(id)) await fetchComments(props.id)
  } catch (err) {
    console.log(err)
  }
}

const addComment = async (comment: Comment) => {
  indexPending.value = 0
  const user_id = profileStore.userProfile.id
  const post_id = props.id
  try {
    const data = await _addComment(comment, user_id, post_id)
    if (!data) throw Error('Não foi possível comentar.')
    await fetchComments(props.id)
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
    <CommentCard
      v-for="(comment, i) in blogStore.comments"
      :key="comment.id!"
      :comment="comment"
      :index-pending="indexPending === i"
      :is-pending="commentPending"
      :post="post"
      :post_id="id"
      :user_id="profileStore.userProfile.id"
      @handle-delete="(id) => deleteComment(comment.id!)"
      @handle-edit="(id) => editComment(comment.id!)"
    />
  </v-container>
  <v-container v-else> Este post nao existe </v-container>
</template>
