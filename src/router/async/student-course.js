import {
  RouteView
} from '@/components/Layouts'

const StudentCourseCenter = () => import(/* webpackChunkName: "student-course-center" */ '@/views/StudentCourse/Center')
const StudentCourseElective = () => import(/* webpackChunkName: "student-course-elective" */ '@/views/StudentCourse/Elective')
const MyElective = () => import(/* webpackChunkName: "mye-elective" */ '@/views/StudentCourse/MyElective')

export default [

  {
    path: '/student-course',
    redirect: '/student-course/center',
    component: RouteView,
    name: 'StudentCourse',
    meta: {
      title: '学生选课信息管理',
      icon: 'icon-xuanxiuke',
      requireAuth: true,
      keepAlive: true,
      permission: ['ADMIN', 'TEACHER', 'STUDENT']
    },
    children: [{
      path: 'center',
      component: StudentCourseCenter,
      name: 'StudentCourseCenter',
      meta: {
        title: '学生选课管理中心',
        requireAuth: true,
        keepAlive: true,
        permission: ['ADMIN', 'TEACHER']
      }
    }, {
      path: 'elective',
      component: StudentCourseElective,
      name: 'StudentCourseElective',
      meta: {
        title: '课程选修',
        requireAuth: true,
        keepAlive: true,
        permission: ['STUDENT']
      }
    },
    {
      path: 'my-elective',
      component: MyElective,
      name: 'MyElective',
      meta: {
        title: '我的选修课',
        requireAuth: true,
        keepAlive: true,
        permission: ['STUDENT']
      }
    }
    ]
  }

]
