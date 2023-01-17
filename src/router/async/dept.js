import {
  RouteView
} from '@/components/Layouts'

const DeptCenter = () => import(/* webpackChunkName: "dept-center" */ '@/views/Dept/Center')

export default [

  {
    path: '/dept',
    redirect: '/dept/center',
    component: RouteView,
    name: 'Dept',
    meta: {
      title: '院系信息管理',
      icon: 'icon-yuanxiguanli',
      requireAuth: true,
      keepAlive: true,
      permission: ['ADMIN']
    },
    children: [{
      path: 'center',
      component: DeptCenter,
      name: 'DeptCenter',
      meta: {
        title: '院系管理中心',
        requireAuth: true,
        keepAlive: true,
        permission: ['ADMIN']
      }
    }]
  }

]
