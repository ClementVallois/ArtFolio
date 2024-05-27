<template>
    <div class="min-h-screen flex flex-col items-center">
        <div class="mb-[5%] flex flex-col items-center mt-[10%]">
            <p class="font-title text-[2rem] lg:text-[2rem] mt-[10%] mb-[2%]">Tu veux en voir plus et joindre la communauté ?</p>
            <p class="text-[1.5rem]">Rien de plus facile !</p>
            <p>Pour accéder à davantage de fonctionnalités, connecte toi ou crée un compte. </p>
            
        </div>
        <div class="flex flex-col items-center">
            <p class="my-5"> Choisis l'action qui te convient :</p>
            <div class="flex flex-row items-center">
            <ButtonComponent textButton="Se connecter" class="w-[40vw] lg:w-[15vw] mx-5" @click="loginApp" ></ButtonComponent>
            <router-link :to=" {name: 'registration'}"> 
                <ButtonComponent textButton="S'inscrire" class="w-[40vw] lg:w-[15vw]" @click="submitForm" ></ButtonComponent>
            </router-link >
            </div>
        </div>
    </div>
</template>

<script setup>
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
import { useAuth0 } from '@auth0/auth0-vue';

const { loginWithRedirect } = useAuth0();

const loginApp = () => {
    loginWithRedirect()
}


</script>