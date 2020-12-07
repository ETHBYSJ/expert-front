import router from './router'
import getPageTitle from '@/utils/get-page-title'
import { getToken } from './utils/auth'

const whiteList = ['/', '/home', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // set title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    next()
  }

  else {
    // has no token
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/home')
    }
  }
})