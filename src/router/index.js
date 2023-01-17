import Vue from 'vue'
import Router from 'vue-router'

import constantRouterMap from './constantRouterMap'

Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior,
  routes: [
    ...constantRouterMap
  ]
})
