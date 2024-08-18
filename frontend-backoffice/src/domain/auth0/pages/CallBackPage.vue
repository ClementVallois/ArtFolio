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
import { useGlobalStore } from '@/stores/store'
import { getAccessTokenManagementAPI } from '@/domain/auth0/api/Auth0ManagementAPI'
import { auth0Service } from '@/domain/auth0/service/Auth0Service'
import LoaderPage from "@/pages/LoaderPage.vue";

const router = useRouter()
const store = useGlobalStore()
const { isAuthenticated, isLoading, user } = useAuth0();

const loading = ref(true)
const error = ref(false)



onMounted(() => {
    setTimeout(async() => {
        if(!isLoading.value && isAuthenticated.value) {

        //get role from auth0
        const role = await auth0Service().getRoleUser(user.value.sub)
        if (role[0].name == 'Moderator'){
            store.role='moderator'
            loading.value=false
            router.push('/home')
        } else {
            loading.value=false
            error.value=true
        }
    }
    }, 1000)

})

</script>