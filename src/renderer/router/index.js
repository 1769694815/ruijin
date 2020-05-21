import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '../layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    name: 'login',
    hide: true,
    component: require('@/views/login').default
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/index',
    children: [{
      path: '',
      name: 'Dashboard',
      component: require('@/views/dashboard').default,
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '*',
    redirect: '/',
    hide: true
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router
