import {
  UserLayout
} from '@/components/Layouts'

const NotFound = () => import(/* webpackChunkName: "NotFound" */ '@/views/Exception/404')
const Forbidden = () => import(/* webpackChunkName: "NotFound" */ '@/views/Exception/403')
const ServerError = () => import(/* webpackChunkName: "ServerError" */ '@/views/Exception/500')

const Login = () => import(/* webpackChunkName: "Login" */ '@/views/Login')

export default [

  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    name: 'user',
    children: [{
      path: 'login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login'
      }
    }]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
    hidden: true,
    meta: {
      title: 'NotFound'
    }
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: Forbidden,
    hidden: true,
    meta: {
      title: 'Forbidden'
    }
  },
  {
    path: '/500',
    name: 'ServerError',
    component: ServerError,
    hidden: true,
    meta: {
      title: 'ServerError'
    }
  }

]
