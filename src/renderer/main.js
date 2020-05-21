import Vue from 'vue'
import axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import db from '../dataStore/index'
import './icons'
import './permission'

Vue.use(Element)

Vue.prototype.$db = db.indexedDB
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
