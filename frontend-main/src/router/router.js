import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import ArtistPage from '@/domain/artist/pages/ArtistPage.vue'
import SearchPage from '@/pages/SearchPage.vue';
import ChatPage from '@/domain/chat/pages/ChatPage.vue';
import AboutPage from '@/pages/AboutPage.vue';
import LoginPage from '@/domain/authentification/pages/LoginPage.vue';
import RegistrationPage from '@/pages/RegistrationPage.vue';
import ArtistRegistrationPage from '@/domain/artist/pages/ArtistRegistrationPage.vue';
import UserRegistrationPage from '@/domain/user/pages/UserRegistrationPage.vue';
import LegalNotionPage from '@/pages/LegalNotionPage.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    // TODO: ajout d'une route avec un id 
    {
        path: '/artist/:artistId',
        name: 'artist',
        component: ArtistPage,
        props: true

    },
    {
        path: '/registration-artist',
        name: 'registration-artist',
        component: ArtistRegistrationPage
    },
    {
        path: '/registration-user',
        name: 'registration-user',
        component: UserRegistrationPage
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
        name: 'registration',
        component: RegistrationPage
    },
    {
        path: '/legal-notion',
        name: 'legalNotion',
        component: LegalNotionPage
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
