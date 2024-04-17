<template>
    <h2 class="text-xl pl-4  px-[1rem] ml-[2rem] font-title">{{ props.title }}</h2>
</template>



<script setup>
const props = defineProps({
    title: String,
});
</script>