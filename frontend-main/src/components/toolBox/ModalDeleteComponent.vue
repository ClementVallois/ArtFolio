<template>
    <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <!-- Fond semi-transparent noir -->
        <div class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 z-10"></div>
        <!-- Contenu de la modal -->
        <div class="fixed  z-20">
            <div class="w-[90vw] max-w-md bg-white rounded p-4 flex flex-col justify-around ">
                <div class="text-center p-[2rem]">{{ textModal }}</div>
                <div class="w-[100%] flex justify-around">
                    <ButtonComponent @click="closeModal" textButton="Annuler" class="w-[30vw] lg:self-end lg:w-[10vw]">
                    </ButtonComponent>
                    <ButtonComponent @click="deleteData" textButton="Supprimer"
                        class="w-[30vw] lg:self-end lg:w-[10vw]">
                    </ButtonComponent>
                </div>

                <button @click="closeModal"
                    class="absolute top-3 right-3 p-2 bg-white rounded-full text-red-700 hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';

// Définir les props et l'émetteur d'événements
const emit = defineEmits(['closeModals', 'deleteData']);
const props = defineProps({
    textModal: String
});

// Fonction pour fermer la modal
const closeModal = () => {
    emit('closeModals');
}

// Fonction pour envoyer delete=true au composant parent
const deleteData = () => {
    emit('deleteData', true);
}
</script>
