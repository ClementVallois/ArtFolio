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
import LoaderPage from "@/components/states/loading/LoaderPage.vue";
import { useStoreUser } from "@/domain/user/store/UserStore";
import { userService } from "@/domain/user/service/UserService";
import { authenticationService } from "../services/AuthenticationService";

const router = useRouter()
const { error, isAuthenticated, isLoading, user} = useAuth0();
const loading = ref(true)
const storeUser = useStoreUser()

onMounted(() => {
    //Wait a bit auth0 instance get generated
    setTimeout(async() => {
        if(!isLoading.value && isAuthenticated.value){
        loading.value=false
        
            try{
            //Get user from database and store it in User Domain. 
            const response = await userService().getUserWithAuth0Id(user.value.sub)
            console.log(response)

            //TODO : Modify with Auth0Id
            storeUser.storeUserProfileFromAuth0IdAndUserRole('e446e0c6-357d-4a7f-91e2-380ac7b9646f')
            router.push('/')
            } catch (error) {
                // User is not found on our database
                if(error.status == 404){
                    //get role from auth0
                    const role = await authenticationService().getRoleUser(user.value.sub)
                    console.log(role)
                    //According to role Artist or User redirect to correct page
                    if (role[0].name == 'Artist'){
                        router.push('/registration-artist')
                    } else {
                        router.push('/registration-user')
                    }
                }
            } 
        }
    }, 1000)    
})

</script>