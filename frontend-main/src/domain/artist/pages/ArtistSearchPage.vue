<template>
    <TitleComponent title="Page résultat recherche"> </TitleComponent>

    <p>{{ artistStore.resultSearchArtist }}</p>

</template>

<script setup>
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import { useStoreArtist } from '@/domain/artist/store/ArtistStore';

const artistStore = useStoreArtist()

</script>