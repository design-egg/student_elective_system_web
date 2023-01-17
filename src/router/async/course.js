import {
  RouteView
} from '@/components/Layouts'

const CourseCenter = () => import(/* webpackChunkName: "course-center" */ '@/views/Course/Center')

export default [

  {
    path: '/course',
    redirect: '/course/center',
    component: RouteView,
    name: 'Course',
    meta: {
      title: '课程信息管理',
      icon: 'icon-kecheng',
      requireAuth: true,
      keepAlive: true,
      permission: ['ADMIN', 'TEACHER']
    },
    children: [{
      path: 'center',
      component: CourseCenter,
      name: 'CourseCenter',
      meta: {
        title: '课程管理中心',
        requireAuth: true,
        keepAlive: true,
        permission: ['ADMIN', 'TEACHER']
      }
    }]
  }

]
