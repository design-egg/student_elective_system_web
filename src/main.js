import Vue from 'vue'
import App from '@/App.vue'

import router from '@/router'
import store from '@/store'

import Storage from 'vue-ls'

import '@/plugins/ant-design-vue.js'
import 'scss-flex'
import 'grid-scss'
import '@/assets/scss/index.scss'

import {
  removeLoadingAnimate
} from '@/utils/util'
import '@/permission'

import Vaxios from 'vaxios-plugin'
import axios from '@/axios'

import {
  ACCESS_TOKEN,
  DEFAULT_COLOR,
  DEFAULT_THEME,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR_WEAK,
  SIDEBAR_TYPE,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_CONTENT_WIDTH_TYPE
} from '@/store/mutation-types'
import config from '@/defaultSettings'

Vue.use(Vaxios, {
  method: axios
})
Vue.use(Storage, config.storageOptions)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  watch: {
    $route (val) {
      document.title = this.$route.meta.title ? `${this.$route.meta.title} | ${this.$root.title}` : `${this.$root.title}`
    }
  },
  mounted () {
    document.title = this.$route.meta.title ? `${this.$route.meta.title} | ${this.$root.title}` : `${this.$root.title}`

    store.commit('SET_SIDEBAR_TYPE', Vue.ls.get(SIDEBAR_TYPE, true))
    store.commit('TOGGLE_THEME', Vue.ls.get(DEFAULT_THEME, config.navTheme))
    store.commit('TOGGLE_LAYOUT_MODE', Vue.ls.get(DEFAULT_LAYOUT_MODE, config.layout))
    store.commit('TOGGLE_FIXED_HEADER', Vue.ls.get(DEFAULT_FIXED_HEADER, config.fixedHeader))
    store.commit('TOGGLE_FIXED_SIDERBAR', Vue.ls.get(DEFAULT_FIXED_SIDEMENU, config.fixSiderbar))
    store.commit('TOGGLE_CONTENT_WIDTH', Vue.ls.get(DEFAULT_CONTENT_WIDTH_TYPE, config.contentWidth))
    store.commit('TOGGLE_FIXED_HEADER_HIDDEN', Vue.ls.get(DEFAULT_FIXED_HEADER_HIDDEN, config.autoHideHeader))
    store.commit('TOGGLE_WEAK', Vue.ls.get(DEFAULT_COLOR_WEAK, config.colorWeak))
    store.commit('TOGGLE_COLOR', Vue.ls.get(DEFAULT_COLOR, config.primaryColor))
    store.commit('SET_TOKEN', Vue.ls.get(ACCESS_TOKEN))

    removeLoadingAnimate('preloadingWrapper', 1500)
  },
  data: {
    title: '????????????????????????'
  }
}).$mount('#app')
