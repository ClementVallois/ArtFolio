import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ArtistView from '@/views/ArtistView.vue'

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
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
