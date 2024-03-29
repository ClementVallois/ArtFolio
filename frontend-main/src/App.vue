<template>
    <NavComponent />
    <div class="w-screen flex flex-col">
        <router-view />
    </div>
    <FooterComponent />
</template>

<script setup>
import NavComponent from '@/components/layout/NavComponent.vue';
import FooterComponent from '@/components/layout/FooterComponent.vue';

</script>