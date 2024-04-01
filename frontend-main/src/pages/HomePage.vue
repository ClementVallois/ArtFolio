<template>
    <HeroBannerComponent></HeroBannerComponent>
    <div class="artist-list">
        <div v-for="artist in allArtistData" :key="artist.id">

            <h2>{{ artist.name }}</h2>

            <router-link :to="{ name: 'artist', params: { id: artist.uuid } }">Voir l'artiste</router-link>
        </div>
    </div>

</template>

<script setup>
import HeroBannerComponent from '@/components/toolBox/HeroBannerComponent.vue';



/// Test artiste list
import { toRaw } from 'vue';
import { artistStore } from '@/domain/artist/store/artistStore';
const artistsStore = artistStore();
const allArtistData = artistsStore.getAllArtist;
console.log(toRaw(allArtistData));

</script>