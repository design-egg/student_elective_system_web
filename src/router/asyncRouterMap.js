import DeptRouter from './async/dept'
import CourseRouter from './async/course'
import MajorRouter from './async/major'
import StudentRouter from './async/student'
import TeacherRouter from './async/teacher'
import StudentCourse from './async/student-course'
import AccountRouter from './async/account'

import {
  BasicLayout
} from '@/components/Layouts'

export default [

  {
    path: '/',
    name: 'Index',
    component: BasicLayout,
    meta: {
      title: '首页'
    },
    redirect: '/user/login',
    children: [
      ...AccountRouter,
      ...DeptRouter,
      ...MajorRouter,
      ...StudentRouter,
      ...TeacherRouter,
      ...CourseRouter,
      ...StudentCourse
    ]
  },
  {
    path: '*',
    redirect: {
      name: 'NotFound'
    },
    hidden: true
  }
]
