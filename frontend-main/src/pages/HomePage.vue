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
import { onMounted, ref} from 'vue';


/// Test artiste list
import { artistStore } from '@/domain/artist/store/artistStore';
const artistsStore = artistStore();


const allArtistData = ref([])

onMounted(async () => {
    allArtistData.value = await artistsStore.getAllArtists();
});





</script>