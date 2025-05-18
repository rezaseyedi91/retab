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
  
  if (to.name == 'login') return true;
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
    // if (err.status == 403) router.push('Login')
    console.log(err.response.status);
    
  }
})
export default router
