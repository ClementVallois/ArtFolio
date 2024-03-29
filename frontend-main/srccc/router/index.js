import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ArtistView from '@/views/ArtistView.vue';
import ArtistRegistrationView from '@/views/ArtistRegistrationView.vue';
import UserRegistrationView from '@/views/UserRegistrationView.vue';
import SearchView from '@/views/SearchView.vue';
import ChatView from '@/views/ChatView.vue';
import AboutView from '@/views/AboutView.vue';
import LoginView from '@/views/LoginView.vue';
import RegistrationView from '@/views/RegistrationView.vue';

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
