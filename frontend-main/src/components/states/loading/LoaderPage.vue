<template>
    <div class="flex justify-center items-center h-screen">
        <div class="text-center">
            <LoaderComponent />
            <p class="mt-5">Une petite seconde le temps que ça charge...</p>
        </div>
    </div>
</template>

<script setup>
import LoaderComponent from '@/components/states/loading/LoaderComponent.vue'

</script>


<style scoped>
/* @keyframes spin {
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
}

.animate-spin {
animation: spin 2s linear infinite;
} */
</style>