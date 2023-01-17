import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
// import config from '@/config'
import {
  notification
} from 'ant-design-vue'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'

const protocol = window.location.protocol

const domain = document.domain
let serverURL = ''

serverURL = `${protocol}` + '//' + `${domain}:7001/api`

// 创建 axios 实例
const instance = axios.create({
  baseURL: serverURL,
  timeout: 6000
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    const status = error.response.status

    switch (status) {
      case 401:
        notification.error({
          message: 'Unauthorized',
          description: 'Authorization verification failed'
        })
        // if (token) {
        store.dispatch('Logout').then(() => {
          if (token) {
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          }
        })
        // }
        break
      case 403:
        notification.error({
          message: 'Forbidden',
          description: data.message
        })
        break
      case 422:
        if (data.data && data.data.length) {
          data.data.forEach(element => {
            notification.error({
              message: 'Unprocessable Entity',
              description: `${element.field}  ${element.message}`
            })
          })
        } else {
          notification.error({
            message: 'Unprocessable Entity',
            description: data.message
          })
        }
        break
    }
  }
  return Promise.reject(error)
}

// http request 拦截器
instance.interceptors.request.use(
  config => {
    // 在 headers 头上添加参数
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  err
)

// http response 拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  err
)

export default instance
