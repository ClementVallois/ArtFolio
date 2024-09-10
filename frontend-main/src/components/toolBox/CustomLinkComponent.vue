<template>
    <router-link :to="props.nameRouter" class="text-sm">
        <p>{{ props.text }}</p>
    </router-link>
</template>

<script setup>
const props = defineProps({
    nameRouter: String,
    text: String,
});
</script>
