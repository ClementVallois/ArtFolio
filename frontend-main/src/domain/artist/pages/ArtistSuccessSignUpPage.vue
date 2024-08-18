<template>
    <div class="flex flex-col items-center text-center min-h-screen">
        
        <ul class="steps mt-10 mb-20">
            <li class="step step-secondary">Créer un compte</li>
            <li class="step step-secondary">Se connecter</li>
            <li class="step">Compléter son profil </li>
            <li class="step">Epingle ton post</li>
        </ul>

        <p class="font-title text-[2rem] lg:text-[2rem]">ETAPE 2</p>
        <p>🚀 Ca y est Tu es inscrit</p>
        <p>Et maintenant connecte-toi ! </p>


        <div class="flex flex-col pb-[1rem] my-[3rem]">
            <ButtonComponent type="submit"  textButton="Connexion" class="w-auto lg:w-[15vw] lg:self-center sm:self-center" @click="loginAuth0"></ButtonComponent>
        </div>
    </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import { onMounted, watch } from 'vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
import { authenticationService } from '@/domain/authentification/services/AuthenticationService.js';

const { loginWithRedirect, isAuthenticated, user } = useAuth0()


const loginAuth0 = () => {
    const redirectUri = `${window.location.origin}/registration-artist`    
    loginWithRedirect({authorizationParams: {
                        redirect_uri: redirectUri
                    }})
}

onMounted(async () => {
    console.log('onMounted')
    assignUserRoleIfNeeded()
});

//Assign Artist Role
const assignUserRoleIfNeeded = () => {
    if (isAuthenticated.value) {
        console.log('successSignUpPage user.value.sub', user.value.sub )
        authenticationService().assignUserRole(user.value.sub, 'Artist');
    }
};
// Add a watch whenever there is a bit of lag in auth0
watch(isAuthenticated, (newValue) => {
    if (newValue) {
        setTimeout(()=> {
            authenticationService().assignUserRole(user.value.sub, 'Artist')
        }, 500)
    }
})




</script>


