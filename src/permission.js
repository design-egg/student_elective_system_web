import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import _ from 'lodash'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'
import { notification } from 'ant-design-vue'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['Login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (Vue.ls.get(ACCESS_TOKEN)) {
    if (to.path === '/user/login') {
      next({
        name: 'Account'
      })
      NProgress.done()
    } else {
      if (!_.size(store.getters.roles)) {
        store
          .dispatch('GetCurrent')
          .then(res => {
            const roles = res.data && res.data.role
            store
              .dispatch('GenerateRoutes', { roles })
              .then(_ => {
                router.addRoutes(store.getters.addRouters)
                const redirect = decodeURIComponent(from.query.redirect || to.path)
                if (to.path === redirect) {
                  next({ ...to, replace: true })
                } else {
                  next({ path: redirect })
                }
              })
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            store.dispatch('Logout').then(() => {
              next({ name: 'Login', query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({
        name: 'Login', query: { redirect: to.fullPath }
      })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
