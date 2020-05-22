/*
 * @Author: xwen
 * @Date: 2020-03-03 14:20:53
 * @LastEditTime: 2020-05-22 16:45:06
 * @LastEditors: xwen
 * @Description: 全局组件注册
 */

import Xtable from '@/components/Xtable/index'

function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  Vue.component('Xtable', Xtable)
}

export default plugin
