<template>

    <NavArtistComponent v-if="globalStore.profile?.role === 'artist'" />
    <NavUserComponent v-if="globalStore.profile?.role === 'user'" />
    <NavComponent v-else />

    <div class="w-screen flex flex-col ">

        <router-view />

    </div>
    <FooterComponent />
</template>

<script setup>
import NavComponent from '@/components/layout/NavComponent.vue';
import FooterComponent from '@/components/layout/FooterComponent.vue';
import NavArtistComponent from '@/domain/artist/components/layout/NavArtistComponent.vue';
import NavUserComponent from '@/domain/user/components/layout/NavUserComponent.vue';
import { useGlobalStore } from '@/store/GlobalStore.js';
import { watch } from 'vue'

// Récupérez l'artist demandé
const globalStore = useGlobalStore();

watch(globalStore.profile?.value, (newValue) => {
    console.log('globalstore.profile?.Value.role', globalStore.profile?.Value.role)
})

</script>