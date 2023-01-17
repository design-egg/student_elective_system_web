import Vue from 'vue'
import {
  login,
  getCurrent
} from '@/api/user'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'
import {
  notification
} from 'ant-design-vue'
import {
  welcome
} from '@/utils/util'

const user = {
  state: {
    name: '',
    welcome: '',
    accessToken: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, accessToken, expiration) => {
      state.accessToken = accessToken
      Vue.ls.set(ACCESS_TOKEN, accessToken, expiration)
    },
    SET_NAME: (state, {
      name,
      welcome
    }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        login(payload)
          .then(response => {
            console.log(response)
            if (response.code === 200) {
              notification.success({
                message: 'Successful',
                description: response.message
              })

              const result = response.data
              commit('SET_TOKEN', result.accessToken, result.expiration)
            }
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetCurrent ({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getCurrent()
          .then(response => {
            const result = response.data

            if (result.role) {
              commit('SET_ROLES', result.role)
              commit('SET_INFO', result)
            }

            commit('SET_NAME', {
              name: result.name,
              welcome: welcome()
            })

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    Logout ({
      commit,
      state
    }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', '')
        Vue.ls.remove(ACCESS_TOKEN)
        window.location.reload()
      })
    }

  }
}

export default user
