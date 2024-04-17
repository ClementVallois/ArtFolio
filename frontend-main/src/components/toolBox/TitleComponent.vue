<template>
    <h1 class="text-3xl pl-4 px-[1rem] ml-[2rem] font-title">{{ props.title }}</h1>
</template>



<script setup>
const props = defineProps({
    title: String,
});
</script>