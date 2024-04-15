<template>
    <button
        class=" bg-transparent hover:bg-black text-black text-sm font-semibold hover:text-white py-1 px-7 border border hover:border-transparent rounded h-[2rem] lg:self-end ">
        {{ props.textButton }}
    </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    textButton: String
});
</script>