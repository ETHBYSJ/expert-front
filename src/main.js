// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // element-ui css

import '@/styles/index.scss' // global css
import '@/styles/button.scss'
import '@/styles/size.scss'

import App from './App'
import store from './store'
import router from './router'

import './permission' // permission control

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
