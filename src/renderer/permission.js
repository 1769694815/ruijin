import router, { constantRoutes } from './router'
import store from './store'

router.beforeEach((to, form, next) => {
  store.dispatch('user/setRoutes', constantRoutes)
  next()
})
