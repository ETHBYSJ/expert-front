import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

// no redirect whitelist when no auth
const whiteList = ['/auth'] 

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  /*console.log({
    from: from.path,
    to: to.path
  })*/
  // --------------------------入口登录-----------------------------
  // set title
  document.title = getPageTitle(to.meta.title)

  const hasLogged = store.getters.status === 'LOGIN'
  // not logged in, jump back to entry.
  if (!hasLogged) {
    store.dispatch('user/login').then(_ =>{
      next({ ...to, replace: true })
    }).catch(err => {
      console.log(err)
      window.location = "https://asc.shusim.com/edu/forum/"
    })
  } 
  
  // logged in
  else { 
    const hasRole = store.getters.role && store.getters.role.length > 0
    if (hasRole) {
      const hasAuth = store.getters.auth === 1
      if (hasAuth) {
        next()
      } else {
        if (whiteList.indexOf(to.path) !== -1) {
          next()
        } else {
          next('/auth')
        }
      }  
    } else {
      try{
        const { role } = await store.dispatch('user/getInfo')
        // role array
        
        const roles = role.split(',')
        // generate accessible routes map based on roles

        var c3jRole = ""
        var rootFlag = false
        var adminFlag = false
        for (var item of roles) {
          if (item.indexOf("c3j.experts") >= 0) {
            c3jRole = item
          } else if (item.indexOf("root") >= 0) {
            rootFlag = true
          } else if (item.indexOf("admin") >= 0) {
            adminFlag = true
          }
        }
        if (c3jRole == "" && (rootFlag || adminFlag)) {
          c3jRole = "authorized/c3j.experts"
        }

        const accessRoutes = await store.dispatch('permission/generateRoutes', c3jRoles) 

        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        next({ ...to, replace: true })  
      } catch (error) {
        NProgress.done()
        window.location = "https://asc.shusim.com/edu/forum/"
      }
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})