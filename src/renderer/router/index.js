import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    name: 'Login',
    hidden: true,
    component: require('@/views/login').default
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    children: [{
      path: 'index',
      name: 'Dashboard',
      component: require('@/views/dashboard').default,
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/patientManage',
    component: Layout,
    children: [{
      path: 'index',
      name: 'PatientManage',
      component: require('@/views/patientManage').default,
      meta: { title: 'patientManage', icon: 'yhgl' }
    }]
  },
  {
    path: '*',
    redirect: '/login',
    hidden: true
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router
