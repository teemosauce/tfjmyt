import Vue from 'vue'
import Router from 'vue-router'
const Login = () =>
  import ('../views/login')

const Index = () =>
  import ('../views/index.vue')

const Home = () =>
  import ('../views/subviews/home.vue')
const Assets = () =>
  import ('../views/subviews/assets/assets.vue')

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    component: Login,
    hidden: true
  }, {
    path: '',
    redirect: {
      path: '/index'
    },
    hidden: true
  }, {
    path: '/',
    redirect: {
      path: '/index'
    },
    hidden: true
  }, {
    path: '/index',
    component: Index,
    meta: {
      shouldLogin: true
    },
    children: [{
      path: '/',
      redirect: {
        path: '/home'
      },
    }, {
      path: '/home',
      component: Home,
      meta: {
        shouldLogin: true,
      }
    }, {
      path: '/assets',
      component: Assets,
      meta: {
        shouldLogin: true
      }
    }]
  }]
})
