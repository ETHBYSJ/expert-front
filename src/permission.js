import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

// get user info
// const { role } = await store.dispatch('user/getInfo')

const whiteList = ['/not-logged'] // no redirect whitelist when not logged

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const status = store.getters.status

  // has logged in
  if (status === 1) {
    const mobile = store.getters.mobile
    // has bind mobile
    if (mobile && mobile.length === 11) {
      if (to.path === '/not-logged' || to.path === '/bind-mobile') {
        // if is logged in, redirect to home
        next({ path: '/' })
        NProgress.done()
      } else {
        // determine whether the user has obtained his permission roles through getInfo
        const hasRole = store.getters.role && store.getters.role.length > 0
        // user has permission
        if (hasRole) {
          next()
        } else {
          try {
            // get user info
            const { roles } = await store.dispatch('user/getInfo')
  
            // generate accessible routes map based on roles
            const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
  
            // dynamically add accessible routes
            router.addRoutes(accessRoutes)
  
            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({ ...to, replace: true })
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('user/resetStatus')
            Message.error(error || '网络错误')
            next('/not-logged')
            NProgress.done()
          }
        }
      }
    } else {
      // has not bind mobile
      next('/bind-phone')
      NProgress.done()
    }
    
    
  } else {
    // not logged in
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next('/not-logged')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})