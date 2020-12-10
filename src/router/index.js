import Vue from 'vue'
import VueRouter from 'vue-router'
import isLoggedIn from '@/assets/isLoggedIn'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    meta: {auth: true},
    component: () => import('@/views/User.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/objects',
    name: 'objects',
    meta: {auth: true},
    component: () => import('@/views/Objects.vue')
  },
  {
    path: '/indications',
    name: 'indications',
    meta: {auth: true},
    component: () => import('@/views/ObjectIndications.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
