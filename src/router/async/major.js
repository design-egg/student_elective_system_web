import {
  RouteView
} from '@/components/Layouts'

const MajorCenter = () => import(/* webpackChunkName: "major-center" */ '@/views/Major/Center')

export default [

  {
    path: '/major',
    redirect: '/major/center',
    component: RouteView,
    name: 'Major',
    meta: {
      title: '专业信息管理',
      icon: 'icon-zhuanye1',
      requireAuth: true,
      keepAlive: true,
      permission: ['ADMIN']
    },
    children: [{
      path: 'center',
      component: MajorCenter,
      name: 'MajorCenter',
      meta: {
        title: '专业管理中心',
        requireAuth: true,
        keepAlive: true,
        permission: ['ADMIN']
      }
    }]
  }

]
