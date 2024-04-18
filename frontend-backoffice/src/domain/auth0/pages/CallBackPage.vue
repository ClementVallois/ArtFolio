<template>
    <div v-if="error" class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 class="text-2xl mb-5">403 - Accès Interdit</h1>
        <p>Aïe, on dirait bien que tu n'ais pas accès à la ressource</p>
        <p>Contacte nos équipes pour recevoir de l'aide </p>
    </div>

    <LoaderPage v-if="loading"/>

</template>


<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router'
import LoaderPage from "@/pages/LoaderPage.vue";

const router = useRouter()
const { error, isAuthenticated, isLoading } = useAuth0();
const loading = ref(true)

onMounted(() => {
    setTimeout(() => {
        console.log('isAuthenticated', isAuthenticated.value)
        console.log('isLoading', isLoading.value)
        if(!isLoading.value && isAuthenticated.value){
        console.log('YAYY')
        loading.value=false
        router.push('/')
    }
    }, 1000)

})

</script>