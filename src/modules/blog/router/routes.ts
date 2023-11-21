// Composables
import { CustomRouteRecordRaw } from 'vue-router'

const routes: CustomRouteRecordRaw[] = [
  {
    path: '/blog',
    component: () => import('../views/BlogHome.vue'),
    name: 'BlogHome',
    meta: {
      title: 'Blog',
      requiresAuth: true,
    },
  },
]

export default routes
