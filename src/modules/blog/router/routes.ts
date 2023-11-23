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
  {
    path: '/blog/post/:id',
    component: () => import('../views/PostView.vue'),
    props: (router) => ({ id: +router.params.id }),
    name: 'PostView',
    meta: {
      title: 'Post',
      requiresAuth: true,
    },
  },
]

export default routes
