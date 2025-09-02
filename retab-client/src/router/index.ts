import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DocsIndex from '@/views/doc/index.vue'
import ImportIndex from '@/views/import/index.vue'
import axios from 'axios'
import store from '@/store'
import TestRoute from '@/views/TestRoute.vue'

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
  },
  
  {
    path: '/import',
    name: 'import',
    component: ImportIndex,
  },
  {
    path: '/dev-test',
    name: 'dev-test',
    component: TestRoute
  },
  {
    path: '/error/500',
    name: '500',
    component: () => import('@/views/error/500.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(async (to, from) => {
  if (to.name == 'login' || to.path.startsWith('/error')) return true;
  try {
    const response = await axios.get(store.state.apiUrl + '/retab/auth', {withCredentials: true})
    const authenticatedUser = response.data
    
    
    
    if (!authenticatedUser || response.status == 403) {
      // throw new Error('YOU HAVE TO LOG IN FIRST!');
      router.push('/Login')
    }
    else {
      Object.assign(store.state, {currentUser: authenticatedUser})
      
      return true
    }
  } catch(err: any) {
    if (!err.response) router.push('/error/500')
    // if (err.status == 403) router.push('Login')
    
  }
})
export default router
