<template>
    <HeroBannerComponent></HeroBannerComponent>
    <div class="artist-list">
        <div v-for="artist in allArtistData" :key="artist.id">
            <router-link :to="{ name: 'artist', params: { artistId: artist.id } }">Voir l'artiste</router-link>
        </div>
    </div>
</template>

<script setup>
import HeroBannerComponent from '@/components/toolBox/HeroBannerComponent.vue';
import { ref, onMounted, toRaw } from 'vue';


/// Test artiste list
import { artistStore } from '@/domain/artist/store/artistStore';
const artistsStore = artistStore();
const allArtistData = artistsStore.getAllArtist;


onMounted(async () => {
    const allPosts = await artistsStore.getAllPost();
    console.log(allPosts);
});



</script>