// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes as main } from '@/modules/main/router'
import { routes as auth } from '@/modules/auth/router'
import { routes as blog } from '@/modules/blog/router'
import beforeEach from './beforeEach'

const routes = [...main, ...auth, ...blog]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach(beforeEach)

export default router
