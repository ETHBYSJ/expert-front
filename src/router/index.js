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
        component: () => import('@/views/home/index'),
        name: 'Home',
        meta: { title: '首页' },
      }
    ]
  },
]

export const asyncRoutes = [
  {
    path: '/dept',
    component: Layout,
    redirect: '/dept/recommend',
    children: [
      {
        path: 'recommend',
        component: () => import('@/views/dept/recommend.vue'),
        name: 'Recommend',
        meta: { title: '专家推荐' },
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