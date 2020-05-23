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
      meta: { title: '患者管理', icon: 'yhgl' }
    }]
  },
  {
    path: '/followUpManage',
    component: Layout,
    children: [{
      path: 'index',
      name: 'PollowUpManage',
      component: require('@/views/followUpManage').default,
      meta: { title: '随访管理', icon: 'ksgl' }
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
