<template>
    <div class="flex flex-col items-center min-h-screen">
        
        <ul class="steps mt-10 mb-20">
            <li class="step step-secondary">Créer un compte</li>
            <li class="step step-secondary">Se connecter</li>
            <li class="step">Compléter son profil </li>
        </ul>

        <p class="font-title text-[2rem] lg:text-[2rem]">ETAPE 2</p>
        <p>🚀 Ca y est Tu es inscrit</p>
        <p>Et maintenant connecte-toi ! </p>


        <div class="flex flex-col w-[90vw] pb-[1rem] my-[3rem]">
            <ButtonComponent type="submit"  textButton="Connexion" class="w-[30vw] lg:w-[15vw] lg:self-center sm:self-center" @click="loginAuth0"></ButtonComponent>
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
    const redirectUri = `${window.location.origin}/registration-user`    
    loginWithRedirect({authorizationParams: {
                        redirect_uri: redirectUri
                    }})
}

// We need to asign Role(Artist) in Auth0 Dashboard and get Categories. 
onMounted(async () => {
    assignUserRoleIfNeeded()
    await categoryStore.getAllCategories();
    categories.value = categoryStore.allCategoriesData;
});

//Assign Artist Role
const assignUserRoleIfNeeded = () => {
    if (isAuthenticated.value) {
        authenticationService().assignUserRole(user.value.sub, 'Amateur');
    }
};
// Add a watch whenever there is a bit of lag in auth0
watch(isAuthenticated, (newValue) => {
    if (newValue) {
        setTimeout(()=> {
            authenticationService().assignUserRole(user.value.sub, 'Amateur')
        }, 500)
    }
})

</script>


