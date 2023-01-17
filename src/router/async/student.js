import {
  RouteView
} from '@/components/Layouts'

const StudentCenter = () => import(/* webpackChunkName: "student-center" */ '@/views/Student/Center')

export default [

  {
    path: '/student',
    redirect: '/student/center',
    component: RouteView,
    name: 'Student',
    meta: {
      title: '学生信息管理',
      icon: 'icon-xuesheng',
      requireAuth: true,
      keepAlive: true,
      permission: ['ADMIN']
    },
    children: [{
      path: 'center',
      component: StudentCenter,
      name: 'StudentCenter',
      meta: {
        title: '学生管理中心',
        requireAuth: true,
        keepAlive: true,
        permission: ['ADMIN']
      }
    }]
  }

]
