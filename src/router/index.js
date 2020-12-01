import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'about',
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
  const token = localStorage.getItem('token')
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
