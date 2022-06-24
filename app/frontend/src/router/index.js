import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SignupView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/boards/:boardId',
    name: 'board',
    component: () => import('../views/BoardView.vue')
  }
]

// TODO: need to setup later
console.log(process.env.BASE_URL)

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = (localStorage.getItem('uid') !== null)

  if (to.name !== 'login' && to.name !== 'signup' && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
