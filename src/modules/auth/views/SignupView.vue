<script setup lang="ts">
import { AlertError, SignupForm } from '../components'
import type { Credentials } from '../types/Auth'
import { useAuth } from '../composables'
import { useRouter } from 'vue-router'
const { signup, isPending: authPending, error: authError } = useAuth()
const router = useRouter()

const handleSignup = async (credentials: Credentials) => {
  await signup(credentials)
    .then((data) => {
      if (data) router.push({ name: 'ProfileView' })
    })
    .catch((e) => {
      console.log(e)
    })
}
</script>

<template>
  <v-container class="fill-height justify-center">
    <v-card
      class="pa-4 rounded"
      elevation="6"
      width="400"
    >
      <template #title>
        <div class="text-center text-h4 pb-2">Signup</div>
      </template>
      <SignupForm
        :is-pending="authPending"
        @signup="(credentials) => handleSignup(credentials)"
      />
      <AlertError :error="authError" />
    </v-card>
  </v-container>
</template>
