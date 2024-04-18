<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 class="text-2xl mb-4">404 - Page Not Found</h1>
            <p class="mb-4">The page you are looking for does not exist.</p>
            <button @click="goBack" class="bg-gray-800 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300">Go Back </button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const goBack = () => {    
    router.go(-1);
};

</script>
