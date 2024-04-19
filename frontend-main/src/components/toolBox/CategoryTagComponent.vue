<template>
    <div
        class="bg-black text-white text-sm font-semibold  text-center px-7 p-2  hover:bg-gray-800 max-w-[15rem] m-[0.5rem] rounded-[1rem] ">
        {{ props.textTag }}
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    textTag: String
});
</script>