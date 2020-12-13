import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/not-logged'] // no redirect whitelist when not logged

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  console.log({
    from: from.path,
    to: to.path
  })

  // set title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const status = store.getters.status

  // has logged in
  if (status === 1) {
    console.log('logged')
    // redirect to home
    if (to.path === '/not-logged') {
      next({ path: '/home' })
    } else {
      // determine whether the user has bind mobile
      const mobile = store.getters.mobile
      // has bind mobile
      if (mobile && mobile.length === 11) {
        if (to.path === '/bind-mobile') {
          // if is logged in, redirect to home
          next({ path: '/home' })
        } else {
          next()
        }
      } else {
        // has not bind mobile
        if (to.path === '/bind-mobile') {
          next()
        } else {
          next('/bind-mobile')
        }
      }
    }

  } else {
    // not logged in
    console.log('not logged')
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // get user info to check session
      store.dispatch('user/getInfo').then(response => {
        // check mobile and role
        const { mobile, role } = response
        if (!mobile || mobile.length !== 11) {
          next('/bind-mobile')
        }
        if (role && role.length > 0) {
          store.dispatch('permission/generateRoutes', role.split('/')).then(accessRoutes => {
            router.addRoutes(accessRoutes)
            next({ ...to, replace: true })
          })
        } else {
          // has no roles
          next()
        }
      }).catch(error => {
        console.log(error)
        store.dispatch('user/resetStatus').then(() => {
          next(`/not-logged?redirect=${to.path}`)
        })
      })
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})