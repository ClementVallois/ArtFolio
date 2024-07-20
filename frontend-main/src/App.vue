<template>

    <NavArtistComponent v-if="authenticationStore.profile?.role === 'artist'" />
    <NavUserComponent v-else-if="authenticationStore.profile?.role === 'amateur'" />
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
import { useAuthenticationPersistStore } from '@/domain/authentification/store/AuthenticationPersistStore.js'
import { useGlobalStore } from '@/store/GlobalStore.js';
import { watch } from 'vue'


// Récupérez l'artist demandé
const globalStore = useGlobalStore();
const authenticationStore = useAuthenticationPersistStore()


watch(authenticationStore.profile?.value, (newValue) => {
    console.log('globalstore.profile?.Value.role', authenticationStore.profile?.value.role)
})

</script>