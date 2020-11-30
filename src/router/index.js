import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/layouts/MainLayout.vue')
  },
  {
    path: '/about',
    name: 'about',
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
    component: () => import('@/views/Objects.vue')
  },
  {
    path: '/indications',
    name: 'indications',
    component: () => import('@/views/ObjectIndications.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
