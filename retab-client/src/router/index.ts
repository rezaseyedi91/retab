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
  },
  {
    path: '/admin/Login',
    name: 'admin-login',
    component: () => import('@/views/admin/Login.vue')
  },
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: () => import('@/views/admin/Dashboard.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: {name: 'admin-dashboard'}
  },
  {
    path: '/admin/users-management',
    name: 'admin-users-management',
    component: () => import('@/views/admin/UsersManagement.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_PATH),
  routes
})
router.beforeEach(async (to, from) => {
  if (['login', 'admin-login'].includes(to.name as string) || to.path.startsWith('/error')) return true;
  try {
    const checkAdmin = to.path.includes('admin')
    const response = await axios.get(store.state.apiUrl + '/retab/auth' , {withCredentials: true, params: {checkAdmin}})
    const authenticatedUser = response.data

    
    
    
    if (!authenticatedUser || response.status == 403) {
      // throw new Error('YOU HAVE TO LOG IN FIRST!');
      alert('You have to log in first')
      router.push(process.env.VUE_APP_BASE_PATH +  (!checkAdmin ? '/Login' : '/admin/login'))
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
