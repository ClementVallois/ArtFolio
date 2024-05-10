import { createRouter, createWebHistory } from 'vue-router';
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
        props: true

    },
    {
        path: '/artist-info',
        name: 'ArtistInfoPage',
        component: ArtistInfoPage
    },
    {
        path: '/form-post',
        name: 'PostFormPage',
        component: PostFormPage
    },
    {
        path: '/success-signup-user',
        name: 'UserSuccessSignUp',
        component: UserSuccessSignUpPage
    },
    {
        path: '/success-signup-artist',
        name: 'ArtistSuccessSignUp',
        component: ArtistSuccessSignUpPage
    },
    {
        path: '/registration-artist',
        name: 'ArtistRegistrationPage',
        component: ArtistRegistrationPage
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
        component: SearchPage
    },
    {
        path: '/chat',
        name: 'chat',
        component: ChatPage
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
        component: CallBackPage
    },



]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0, left: 0 }
    }
})

export default router
