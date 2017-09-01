// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import config from './config'


Vue.config.productionTip = false

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  if (Array.isArray(to.matched) && to.matched.length > 0) {
    if (to.matched.some(m => m.meta.shouldLogin)) {
      var session = config.getSessionId()
      if (!session) {
        return next({
          path: '/login'
        })
      } else {
        return next()
      }
    }
  } else {
    return next({
      path: '/404'
    })
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
