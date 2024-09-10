<template>
    <div class="min-h-screen flex flex-col items-center">
        <div class="mb-[5%] flex flex-col items-center mt-[10%]">
            <h1 class="text-2xl mb-5">404 - Non Trouvé</h1>
            <p>Aïe, on dirait bien que la page que tu cherches n'existe pas</p>
        </div>
            <div class="flex flex-col items-center">
                <router-link :to="{ name: 'home'}" >
                    <ButtonComponent textButton="Retour Accueil" class="w-[30vw] lg:w-[20vw]"></ButtonComponent>
                </router-link>
            </div>
    </div>
</template>

<script setup>
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';



</script>