<template>
        <div class="min-h-screen flex items-center justify-center bg-gray-100">
            <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center">
                <h2 class="text-2xl font-semibold mb-4">Welcome to ArtFolio Dashboard</h2>
                <p class="text-gray-600 mb-8">Please sign in to continue.</p>
                <button @click="login" class="bg-gray-800 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300">
                    Sign In with Auth0
                </button>
            </div>
        </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
const { user, isAuthenticated, loginWithRedirect } = useAuth0();


const login = () => {
    loginWithRedirect();
};
</script>
