import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import ArtistView from '@/domain/artist/pages/ArtistView.vue'
import UserView from '@/domain/user/pages/UserView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/artist',
    name: 'artist',
    component: ArtistView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },


  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //   }
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
