import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    name: 'Login',
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
    path: '/patientManage',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'PatientManage',
      component: require('@/views/patientManage').default,
      meta: { title: 'patientManage', icon: 'yhgl' }
    }]
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router
