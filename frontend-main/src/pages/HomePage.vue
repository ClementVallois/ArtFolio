<template>
    <HeroBannerComponent></HeroBannerComponent>
    <div class="artist-list">
        <div v-for="artist in allArtistData" :key="artist.id">
            <router-link :to="{ name: 'artist', params: { artistId: artist.id } }">Voir l'artiste</router-link>
        </div>
    </div>
<TextScrollingComponent text="“L'art, c'est la plus sublime mission de l'homme, puisque c'est l'exercice de la pensée qui cherche à comprendre le monde et à le faire comprendre.” Auguste Rodin"></TextScrollingComponent>

<CarousselComponent></CarousselComponent>

</template>

<script setup>
import HeroBannerComponent from '@/components/toolBox/HeroBannerComponent.vue';
import TextScrollingComponent from '@/components/toolBox/TextScrollingComponent.vue';
import CarousselComponent from '@/components/toolBox/CarousselComponent.vue';
import CardArtistComponent from '@/domain/artist/components/toolbox/CardArtistComponent.vue'
import { onMounted, ref} from 'vue';


/// Test artiste list
import { artistStore } from '@/domain/artist/store/artistStore';
const artistsStore = artistStore();


const allArtistData = ref([])

onMounted(async () => {
    allArtistData.value = await artistsStore.getAllArtists();
});


</script>
