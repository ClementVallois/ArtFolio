<template>
    <NavComponent v-if="storeUser.activeRole === 'none'" />
    <NavArtistComponent v-if="storeUser.activeRole === 'artist'" />
    <NavUserComponent v-if="storeUser.activeRole === 'user'" />

    <div class="w-screen flex flex-col ">

        <router-view />

    </div>
    <FooterComponent />
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import NavComponent from '@/components/layout/NavComponent.vue';
import FooterComponent from '@/components/layout/FooterComponent.vue';
import NavArtistComponent from '@/domain/artist/components/layout/NavArtistComponent.vue';
import NavUserComponent from '@/domain/user/components/layout/NavUserComponent.vue';
import { useGlobalStore } from '@/store/GlobalStore.js';
import { useStoreUser } from './domain/user/store/UserStore';

// Récupérez l'artist demandé
const storeUser = useStoreUser();

</script>