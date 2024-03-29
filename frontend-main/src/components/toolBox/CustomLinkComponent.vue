<template>
    <router-link :to="props.nameRouter" class="text-gray-800 text-sm  ">
        <p>{{ props.text }}</p>
    </router-link>
</template>

<script setup lang="ts">
const props = defineProps({
    nameRouter: String,
    text: String,
});
</script>
