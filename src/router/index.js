import Vue from 'vue'
import store from '../store/index'
import VueRouter from 'vue-router'
import Login from '../views/auth/login.vue'
import Register from '../views/auth/register.vue'
import Index from '../views/main/index.vue'

import maps from '../views/maps.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresVisitor: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresVisitor: true }
  },
  {
    path: '/main',
    name: 'Index',
    component: Index,
    meta: { requiresAuth: true }
  },
  {
    path: '/maps',
    name: 'maps',
    component: maps,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      Vue.swal.fire({
        title: 'Error!',
        text: 'the page cannot be accessed',
        icon: 'error',
        confirmButtonText: 'Relogin'
      })
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      Vue.swal.fire({
        title: 'Error!',
        text: 'the page cannot be accessed',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      next({
        path: '/main'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
