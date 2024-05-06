<template>
    <div v-if="visible" role="alert" class=" bg-white fixed top-10 right-0 m-4 bg-red-100 border border-error text-red-700 px-4 py-4 rounded flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <span class="mr-2 pl-2">{{ textAlert }}</span>
        <button @click="closeAlert" class="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-700 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
const emit = defineEmits(['closeErrorAlert']);
const props = defineProps({
    textAlert: String
});

const visible = ref(true);

const closeAlert = () => {
    visible.value = false;
    emit('closeErrorAlert');
};

// Fermer automatiquement l'alerte après 20 secondes
setTimeout(() => {
    visible.value = false;
    emit('closeErrorAlert');
}, 10000);
</script>
