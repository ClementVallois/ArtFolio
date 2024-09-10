import { createRouter, createWebHistory } from 'vue-router'
//AUTH0 REACTIVATE
import { authGuard } from '@auth0/auth0-vue'
import { useGlobalStore } from '@/stores/store'
import SignInPage from '../pages/SignInPage.vue'
import HomePage from '../pages/HomePage.vue'
import ArtistPage from '@/domain/artist/pages/ArtistPage.vue'
import UserPage from '@/domain/user/pages/UserPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import NotFoundPage from '../pages/404NotFound.vue'
import LoaderPage from '@/pages/LoaderPage.vue'
import CallBackPage from '@/domain/auth0/pages/CallBackPage.vue'
import Auth0ArtistPage from '@/domain/auth0/pages/Auth0ArtistPage.vue'
import Unauthorized from '@/pages/Unauthorized.vue'
import PersonalDataRequestPage from '@/domain/personal-data-request/pages/PersonalDataRequestPage.vue'

const routes = [
  {
    path: '/',
    name: 'signin',
    component: SignInPage
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
    beforeEnter: authGuard,
    meta: { roles: ['moderator'] }
  },
  {
    path: '/artist',
    name: 'artist',
    component: ArtistPage,
    beforeEnter: authGuard,
    meta: { roles: ['moderator'] }
  },
  {
    path: '/personalDataRequests',
    name: 'personalDataRequests',
    component: PersonalDataRequestPage,
    beforeEnter: authGuard,
    meta: { roles: ['moderator'] }
  },
  {
    path: '/artistAuth0',
    name: 'artistAuth0',
    component: Auth0ArtistPage,
    meta: { roles: ['moderator'] }
  },
  {
    path: '/user',
    name: 'user',
    component: UserPage,
    beforeEnter: authGuard,
    meta: { roles: ['moderator'] }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    beforeEnter: authGuard,
    meta: { roles: ['moderator'] }
  },
  {
    path: '/loader',
    name: 'loader',
    component: LoaderPage
  },
  {
    path: '/callback',
    name: 'callback',
    component: CallBackPage
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: Unauthorized
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: NotFoundPage
  }

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

router.beforeEach(async (to, from, next) => {
  const store = useGlobalStore()
  const { roles } = to.meta

  // Wait for Auth0 to finish loading
  // if (isLoading.value) {
  //     await new Promise(resolve => setTimeout(resolve, 100));
  // }

  // Redirect to login page if not authenticated and route requires authentication
  if (roles && !roles.includes(store.role)) {
    next('/unauthorized')
  } else {
    next()
  }
})

export default router
