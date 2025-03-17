import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DocsIndex from '@/views/doc/index.vue'
import axios from 'axios'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    // redirect: '/first-idea'
    redirect: '/doc'
  },
  {
    path: '/login',
    name: 'login',
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
router.beforeEach(async (to, from) => {
  console.log(to.name)
  if (to.name == 'login') return true;
  const authenticatedUser = (await axios.get(store.state.apiUrl + '/retab/auth', {withCredentials: true})).data
  console.log(authenticatedUser)
  if (!authenticatedUser) {
    // throw new Error('YOU HAVE TO LOG IN FIRST!');
    router.push('/Login')
  }
  else {
    Object.assign(store.state, {currentUser: authenticatedUser})
    //@ts-ignore
    console.log(store.state.currentUser!)
    return true
  }
})
export default router
