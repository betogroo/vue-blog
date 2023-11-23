<script setup lang="ts">
import { useAuthStore } from './modules/auth/store/useAuthStore'
import { AppBar } from '@/shared/components'
import { useAuth } from './modules/auth/composables'
import { useRoute, useRouter } from 'vue-router'
const { logout, isPending: logoutPending } = useAuth()
const route = useRoute()
const router = useRouter()
const store = useAuthStore()

const handleLogout = async () => {
  await logout().then(() => {
    router.push({ name: 'LoginView' })
  })
}
</script>
<template>
  <v-app>
    <AppBar
      v-if="!route.meta.hideAppBar"
      :is-pending="logoutPending"
      :user="store.user"
      @logout="handleLogout"
    />
    <v-main>
      <Suspense>
        <template #fallback>
          <v-card
            color="red"
            height="250"
            width="250"
          >
            Card aqui
          </v-card>
        </template>
        <RouterView />
      </Suspense>
    </v-main>
  </v-app>
</template>
