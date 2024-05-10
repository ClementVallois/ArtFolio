<template>
    <div class="flex flex-col items-center min-h-screen">
        <TitleComponent title="Je suis un artiste" class="text-[3rem] lg:text-[4rem] mt-[3rem]"> </TitleComponent>

        <ul class="steps mt-10 mb-20">
            <li class="step step-secondary">Créer un compte</li>
            <li class="step">Se connecter </li>
            <li class="step">Compléter son profil </li>
            <li class="step">Epingle ton post</li>
        </ul>

        <p class="font-title text-[2rem] lg:text-[2rem]">ETAPE 1</p>
        <p>Commençons par créer un compte</p>
        <p>Il suffira d'une addresse mail et d'un mot de passe</p>


        <div class="flex flex-col w-[90vw] pb-[1rem] my-[3rem]">
            <ButtonComponent type="submit"  textButton="Suivant" class="w-[30vw] lg:w-[15vw] lg:self-center sm:self-center" @click="registerAuth0"></ButtonComponent>
        </div>
    </div>

    
<ErrorAlertComponent v-if="showErrorAlert" @closeErrorAlert="handleCloseErrorAlert" textAlert="Vous devez remplir tous les champs présents."></ErrorAlertComponent>

</template>

<script setup>
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
import ErrorAlertComponent from '@/components/toolBox/ErrorAlertComponent.vue';
import { ref } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

const showErrorAlert = ref(false); 
const { loginWithRedirect } = useAuth0()
const redirectUri = `${window.location.origin}/success-signup-artist`

//permet de rediriger vers la page auth0 register
const registerAuth0 = () => {
    loginWithRedirect({authorizationParams: {
                        screen_hint: "signup",
                        redirect_uri: redirectUri
                    }})
}


// permet de remettre à false "showErrorAlert" lors de la fermeture de l'erreur d'alerte 
const handleCloseErrorAlert = () => {
    showErrorAlert.value = false;
};

</script>

