<template>
    <NavComponent v-if="activeRole === 'none'" />
    <NavArtistComponent v-if="activeRole === 'artist'" />
    <NavUserComponent v-if="activeRole === 'user'" />
    <div class="w-screen flex flex-col">

        <router-view />

    </div>
    <FooterComponent />
</template>

<script setup>
import NavComponent from '@/components/layout/NavComponent.vue';
import FooterComponent from '@/components/layout/FooterComponent.vue';
import NavArtistComponent from '@/domain/artist/components/layout/NavArtistComponent.vue';
import NavUserComponent from '@/domain/user/components/layout/NavUserComponent.vue';

// user, artist, none
const activeRole = "user";
</script>