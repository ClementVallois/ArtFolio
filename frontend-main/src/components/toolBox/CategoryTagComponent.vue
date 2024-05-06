<template>
    <div :class="{
        'bg-white text-black border': !isSelected, 'bg-black text-white': isSelected}" @click="toggleSelection" class="text-sm font-semibold text-center px-7 p-2 hover:bg-gray-800 max-w-[20rem] m-[0.5rem] rounded-[1rem] cursor-pointer">
        {{ textTag }}
    </div>
</template>

<script setup>
import { ref,defineProps, defineEmits } from 'vue';
const props = defineProps({
    textTag: String
});
const isSelected = ref(false);
const   emit  = defineEmits(['categoryClicked']);

// permet de sélectionner les catégories et de les envoyés au composant du dessus
const toggleSelection = () => {
    isSelected.value = !isSelected.value;
    emit('categoryClicked', props.textTag);
};
</script>
