import {
  RouteView
} from '@/components/Layouts'

const AccountCenter = () => import(/* webpackChunkName: "account-center" */ '@/views/Account/Center')

export default [

  {
    path: '/account',
    redirect: '/account/center',
    component: RouteView,
    name: 'Account',
    meta: {
      title: '个人页',
      icon: 'icon-yonghu',
      requireAuth: true,
      keepAlive: true,
      permission: ['ADMIN', 'STUDENT', 'TEACHER']
    },
    children: [{
      path: 'center',
      component: AccountCenter,
      name: 'AccountCenter',
      meta: {
        title: '个人中心',
        requireAuth: true,
        keepAlive: true,
        permission: ['ADMIN', 'STUDENT', 'TEACHER']
      }
    }]
  }

]
