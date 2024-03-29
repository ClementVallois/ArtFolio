<template>
    <h1 class="text-3xl pl-4 border-l-4 border-black px-[1rem] ml-[2rem]">{{ props.title }}</h1>
</template>






<script setup>
const props = defineProps({
    title: String,
});
</script>