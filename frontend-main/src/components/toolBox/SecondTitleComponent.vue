<template>
    <h2 class="pl-4  px-[1rem] font-title text-[1.5rem] lg:text-[2rem] ">{{ props.title }}</h2>
</template>



<script setup>
const props = defineProps({
    title: String,
});
</script>