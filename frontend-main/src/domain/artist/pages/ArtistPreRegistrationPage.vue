<template>
    <div class="flex flex-col items-center text-center min-h-screen">
        <TitleComponent title="Je suis un artiste" class="text-[3rem] lg:text-[4rem] mt-[3rem] ml-0"> </TitleComponent>

        <ul class="steps mt-10 mb-20">
            <li class="step step-secondary">Créer un compte</li>
            <li class="step">Se connecter </li>
            <li class="step">Compléter son profil </li>
            <li class="step">Epingle ton post</li>
        </ul>

        <p class="font-title text-[2rem] lg:text-[2rem]">ETAPE 1</p>
        <p>Commençons par créer un compte</p>
        <p>Il suffira d'une adresse mail et d'un mot de passe</p>


        <div class="flex flex-col pb-[1rem] my-[3rem]">
            <ButtonComponent type="submit"  textButton="Suivant" class="w-[30vw] lg:w-[15vw] lg:self-center sm:self-center" @click="registerAuth0"></ButtonComponent>
        </div>
    </div>

    
<AlertComponent v-if="showAlert" v-model:alertError="alertError" @closeAlert="handleCloseAlert" textAlert="Vous devez remplir tous les champs présents."></AlertComponent>

</template>

<script setup>
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
import AlertComponent from '@/components/toolBox/AlertComponent.vue';
import { onMounted, ref } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

const showAlert = ref(false); 
const alertError = ref(true);
const { loginWithRedirect } = useAuth0()
const redirectUri = `${window.location.origin}/success-signup-artist`


//permet de rediriger vers la page auth0 register
const registerAuth0 = () => {
    loginWithRedirect({authorizationParams: {
                        screen_hint: "signup",
                        redirect_uri: redirectUri
                    }})
}


// permet de remettre à false "showAlert" lors de la fermeture de l'erreur d'alerte 
const handleCloseAlert = () => {
    alertError.value = true;
    showAlert.value = false;
};

</script>

