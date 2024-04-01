<template>
    <TitleComponent title="Artiste"> </TitleComponent>
</template>

<script setup>

import TitleComponent from '@/components/toolBox/TitleComponent.vue';

/// Test
import { artistStore } from '@/domain/artist/store/artistStore';
const artistsStore = artistStore();
const allArtistData = artistsStore.getAllArtist;
console.log(allArtistData[1]);

</script>