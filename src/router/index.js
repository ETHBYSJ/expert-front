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
        path: 'auth',
        component: () => import('@/views/auth'),
        name: 'Auth',
        meta: { title: '验证信息' },
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
        component: () => import('@/views/dept/detail'),
        name: 'DeptDetail',
        meta: { title: '单位推荐概况', roles: ['manager'] },
      },
      {
        path: 'recommend',
        component: () => import('@/views/dept/recommend'),
        name: 'DeptRecommend',
        meta: { title: '专家推荐', roles: ['manager'] },
      }
    ]
  },
  {
    path: '/prof',
    component: Layout,
    redirect: '/prof/detail',
    children: [
      {
        path: 'detail',
        component: () => import('@/views/prof/detail'),
        name: 'ProfDetail',
        meta: { title: '我的申请', roles: ['professor', 'manager']},
      },
      {
        path: 'apply',
        component: () => import('@/views/prof/apply'),
        name: 'ProfApply',
        meta: { title: '专家申请', roles: ['professor', 'manager']},
      }
    ]
  },
  {
    path: '/find',
    component: Layout,
    redirect: '/find/input',
    children: [
      {
        path: 'input',
        component: () => import('@/views/find/input'),
        name: 'FindInput',
        meta: { title: '专家搜索', roles: ['authorized', 'professor', 'manager']},
      },
      {
        path: 'result',
        component: () => import('@/views/find/result'),
        name: 'FindResult',
        meta: { title: '专家搜索', roles: ['authorized', 'professor', 'manager']},
      }
    ]
  }
]

const router = new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router