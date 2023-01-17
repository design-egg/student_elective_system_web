import {
  RouteView
} from '@/components/Layouts'

const TeacherCenter = () => import(/* webpackChunkName: "teacher-center" */ '@/views/Teacher/Center')

export default [

  {
    path: '/teacher',
    redirect: '/teacher/center',
    component: RouteView,
    name: 'Teacher',
    meta: {
      title: '教师信息管理',
      icon: 'icon-jiaoshi',
      requireAuth: true,
      keepAlive: true,
      permission: ['ADMIN']
    },
    children: [{
      path: 'center',
      component: TeacherCenter,
      name: 'TeacherCenter',
      meta: {
        title: '教师管理中心',
        requireAuth: true,
        keepAlive: true,
        permission: ['ADMIN']
      }
    }]
  }

]
