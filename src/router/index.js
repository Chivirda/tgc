import Vue from 'vue'
import VueRouter from 'vue-router'


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
  const token = localStorage.getItem('token')

  function parseJwt (token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
  }

  const expireTime = Date(parseJwt(token).exp)
  const now = Date.now() / 1000
  console.log('Now', Date(now))
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && expireTime < now) {
    next('/login')
  } else {
    next()
  }
})

export default router
