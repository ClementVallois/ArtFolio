<template>
    <NavComponent v-if="activeRole === 'none'" />
    <NavArtistComponent v-if="activeRole === 'artist'" />
    <NavUserComponent v-if="activeRole === 'user'" />
    <div class="w-screen flex flex-col ">

        <router-view />

    </div>
    <FooterComponent />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavComponent from '@/components/layout/NavComponent.vue';
import FooterComponent from '@/components/layout/FooterComponent.vue';
import NavArtistComponent from '@/domain/artist/components/layout/NavArtistComponent.vue';
import NavUserComponent from '@/domain/user/components/layout/NavUserComponent.vue';
import { globalStore } from '@/store/GlobalStore.js';

// Récupérez l'artist demandé
const storeGlobal = globalStore();
const activeRole = ref([]);
onMounted(async () => {
    activeRole.value = storeGlobal.activeRole;
});
</script>