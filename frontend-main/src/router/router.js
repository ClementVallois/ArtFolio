import { createRouter, createWebHistory } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import { useStoreUser } from '@/domain/user/store/UserStore.js'
import HomePage from '@/pages/HomePage.vue';
import ArtistPage from '@/domain/artist/pages/ArtistPage.vue';
import PostFormPage from '@/domain/artist/pages/PostFormPage.vue'
import ArtistInfoPage from '@/domain/artist/pages/ArtistInfoPage.vue';
import SearchPage from '@/pages/SearchPage.vue';
import ChatPage from '@/domain/chat/pages/ChatPage.vue';
import AboutPage from '@/pages/AboutPage.vue';
import LoginPage from '@/domain/authentification/pages/LoginPage.vue';
import RegistrationPage from '@/pages/RegistrationPage.vue';
import ArtistRegistrationPage from '@/domain/artist/pages/ArtistRegistrationPage.vue';
import ArtistPreRegistrationPage from '@/domain/artist/pages/ArtistPreRegistrationPage.vue'
import UserRegistrationPage from '@/domain/user/pages/UserRegistrationPage.vue';
import LegalNotionPage from '@/pages/LegalNotionPage.vue';
import CallBackPage from '@/domain/authentification/pages/CallBackPage.vue';
import UserPreRegistrationPage from '@/domain/user/pages/UserPreRegistrationPage.vue';
import UserSuccessSignUpPage from '@/domain/user/pages/UserSuccessSignUpPage.vue';
import ArtistSuccessSignUpPage from '@/domain/artist/pages/ArtistSuccessSignUpPage.vue';
import RedirectToAuthenticationPage from '@/domain/authentification/pages/RedirectToAuthenticationPage.vue';
import { authenticationService } from '@/domain/authentification/services/AuthenticationService';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/artist/:artistId',
        name: 'artist',
        component: ArtistPage,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: '/artist-info',
        name: 'ArtistInfoPage',
        component: ArtistInfoPage,
        meta: { requiresAuth: true }

    },
    {
        path: '/form-post',
        name: 'PostFormPage',
        component: PostFormPage,
        meta: { requiresAuth: true }

    },
    {
        path: '/success-signup-user',
        name: 'UserSuccessSignUp',
        component: UserSuccessSignUpPage,
    },
    {
        path: '/success-signup-artist',
        name: 'ArtistSuccessSignUp',
        component: ArtistSuccessSignUpPage,
    },
    {
        path: '/registration-artist',
        name: 'ArtistRegistrationPage',
        component: ArtistRegistrationPage,
    },
    {
        path: '/preregistration-artist',
        name: 'ArtistPreRegistrationPage',
        component: ArtistPreRegistrationPage
    },
    {
        path: '/registration-user',
        name: 'UserRegistrationPage',
        component: UserRegistrationPage
    },
    {
        path: '/preregistration-user',
        name: 'UserPreRegistrationPage',
        component: UserPreRegistrationPage
    },
    {
        path: '/search',
        name: 'search',
        component: SearchPage,
        meta: { requiresAuth: true }

    },
    {
        path: '/chat',
        name: 'chat',
        component: ChatPage,
        meta: { requiresAuth: true },
    },
    {
        path: '/about',
        name: 'about',
        component: AboutPage
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/registration',
        name: 'RegistrationPage',
        component: RegistrationPage
    },
    {
        path: '/legal-notion',
        name: 'legalNotion',
        component: LegalNotionPage
    },
    {
        path: '/callback',
        name: 'callback',
        component: CallBackPage,
    },
    {
        path: '/register-login',
        name: 'RedirectToAuthenticationPage',
        component: RedirectToAuthenticationPage
    },



]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0, left: 0 }
    }
})


router.beforeEach(async (to, from, next) => {
    const { isAuthenticated, isLoading, user } = useAuth0();
    const storeUser = useStoreUser();

    // Wait for Auth0 to finish loading
    if (isLoading.value) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Redirect to login page if not authenticated and route requires authentication
    if (to.meta.requiresAuth && !isAuthenticated.value) {
        next('/register-login');
    } else if (to.meta.requiresAuth && isAuthenticated.value && storeUser.userProfile == null ) {
        //GetRole from auth0
        const response = await authenticationService().getRoleUser(user.value.sub)
        console.log(response)
        next()
    } else {
        next();
    }
});

// router.beforeEach(async (to, from, next) => {
    
    
//     if (to.meta.requiresAuth) {
//       // If the route requires authentication and the user is not authorized,
//       // redirect the user to the custom login page
//         next('/register-login');
//     } else {
//       // Otherwise, allow the user to access the route
//         next();
//     }
// });

export default router
