import router from './router'
import store from './store'
import { constantRoutes } from './router'

router.beforeEach((to, form, next) => {
  store.dispatch('user/setRoutes', constantRoutes)
  next()
})