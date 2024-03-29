import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/pages/HomePage.vue';
import ArtistView from '@/domain/artist/pages/ArtistPage.vue'
import SearchView from '@/pages/SearchPage.vue';
import ChatView from '@/domain/chat/pages/ChatPage.vue';
import AboutView from '@/pages/AboutPage.vue';
import LoginView from '@/domain/authentification/pages/LoginPage.vue';
import RegistrationView from '@/pages/RegistrationPage.vue';
import ArtistRegistrationView from '@/domain/artist/pages/ArtistRegistrationPage.vue';
import UserRegistrationView from '@/domain/user/pages/UserRegistrationPage.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    // TODO: ajout d'une route avec un id 
    {
        path: '/artist',
        name: 'artist',
        component: ArtistView
    },
    {
        path: '/registration-artist',
        name: 'registration-artist',
        component: ArtistRegistrationView
    },
    {
        path: '/registration-user',
        name: 'registration-user',
        component: UserRegistrationView
    },
    {
        path: '/search',
        name: 'search',
        component: SearchView
    },
    {
        path: '/chat',
        name: 'chat',
        component: ChatView
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/registration',
        name: 'registration',
        component: RegistrationView
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
