import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home'),
        name: 'Home',
        meta: { title: '首页' },
      },
      {
        path: 'not-logged',
        component: () => import('@/views/NotLogged'),
        name: 'NotLoggod',
        meta: { title: '未登录' },
      },
      {
        path: 'bind-mobile',
        component: () => import('@/views/BindMobile'),
        name: 'BindMobile',
        meta: { title: '绑定手机号' },
      }
    ]
  },
]

export const asyncRoutes = [
  {
    path: '/dept',
    component: Layout,
    redirect: '/dept/detail',
    children: [
      {
        path: 'detail',
        // test jump
        redirect: '/dept/recommend',
        component: () => import('@/views/dept/detail'),
        name: 'DeptDetail',
        meta: { title: '单位概况', roles: ['manager'] },
      },
      {
        path: 'recommend',
        component: () => import('@/views/dept/recommend'),
        name: 'DeptRecommend',
        meta: { title: '专家推荐', roles: ['manager'] },
      }
    ]
  }
]

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router