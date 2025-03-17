import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DocsIndex from '@/views/doc/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    // redirect: '/first-idea'
    redirect: '/doc'
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
    // redirect: '/first-idea'
    // redirect: ''
  },


  {
    path: '/doc',
    name: 'doc',
    component: DocsIndex,
  },
  {
    path: '/doc/:id',
    component: () => import('@/views/doc/[id].vue')
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
