<template>
    <button type="button" class="flex w-full items-center py-2 px-4 text-green-500 hover:bg-green-500 hover:text-white"
        @click=clickProcess()>
        Traiter
    </button>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['clickProcess']);

const clickProcess = () => {
    emit('clickProcess')
}

</script>