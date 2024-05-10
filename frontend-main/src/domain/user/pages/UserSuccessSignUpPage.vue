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
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';

const { loginWithRedirect } = useAuth0()

const loginAuth0 = () => {
    const redirectUri = `${window.location.origin}/registration-user`    
    loginWithRedirect({authorizationParams: {
                        redirect_uri: redirectUri
                    }})
}

</script>


