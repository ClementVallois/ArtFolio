import { createRouter, createWebHistory } from 'vue-router'
//AUTH0 REACTIVATE
import { authGuard } from "@auth0/auth0-vue";
import SignInPage from '../pages/SignInPage.vue'
import HomePage from '../pages/HomePage.vue'
import ArtistPage from '@/domain/artist/pages/ArtistPage.vue'
import UserPage from '@/domain/user/pages/UserPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import NotFoundPage from '../pages/404NotFound.vue'
import LoaderPage from '@/pages/LoaderPage.vue';
import CallBackPage from '@/domain/auth0/pages/CallBackPage.vue';
import Auth0ArtistPage from '@/domain/auth0/pages/Auth0ArtistPage.vue'

const routes = [
  {
    path: '/signin',
    name: 'signin',
    component: SignInPage
  },
  {
    path: '/',
    name: 'home',
    component: HomePage,
    beforeEnter: authGuard,
  },
  {
    path: '/artist',
    name: 'artist',
    component: ArtistPage,
    beforeEnter: authGuard,
  },
  {
    path: '/artistAuth0',
    name: 'artistAuth0',
    component: Auth0ArtistPage,
  },
  {
    path: '/user',
    name: 'user',
    component: UserPage,
    beforeEnter: authGuard,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    beforeEnter: authGuard,
  },
  {
    path: '/loader',
    name: 'loader',
    component: LoaderPage,
  },
  {
    path: "/callback",
    name: "callback",
    component: CallBackPage,
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: NotFoundPage,
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
