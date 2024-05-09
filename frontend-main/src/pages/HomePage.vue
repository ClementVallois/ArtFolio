<template>
  <HeroBannerComponent></HeroBannerComponent>
  <TitleComponent title="Les derniers inscrits" class="text-[3rem] lg:text-[4rem] pb-[1rem]"> </TitleComponent>
  <CarousselComponent :carousselData="artistStore.lastRegisteredArtist" class="mb-[3rem]"></CarousselComponent>
  <TextScrollingComponent text="“L'art, c'est la plus sublime mission de l'homme, puisque c'est l'exercice de la pensée qui cherche à comprendre le monde et à le faire comprendre.” Auguste Rodin"></TextScrollingComponent>
  <TitleComponent title="Les artistes aléatoires" class="text-[3rem] lg:text-[4rem] mt-[3rem] text-end mr-[2rem] pb-[1rem]"> </TitleComponent>
  <CarousselComponent :carousselData="artistStore.randomArtist"></CarousselComponent>
  <div class="artist-list">
    <div v-for="artist in artistStore.allArtistData" :key="artist.id">
        <router-link :to="{ name: 'artist', params: { artistId: artist.id } }">Voir l'artiste</router-link>
    </div>
  </div>  
</template>

<script setup>
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import HeroBannerComponent from '@/components/toolBox/HeroBannerComponent.vue';
import TextScrollingComponent from '@/components/toolBox/TextScrollingComponent.vue';
import CarousselComponent from '@/components/toolBox/CarousselComponent.vue';
import { onMounted} from 'vue';
import { useStoreArtist } from '@/domain/artist/store/ArtistStore';


const props = defineProps({
    carousselData: Array
});

const artistStore = useStoreArtist();

onMounted(async () => {
  await artistStore.getAllArtists();
  await artistStore.getLastRegisteredArtist(15);
  await artistStore.getRandomArtist(15);
  console.log(artistStore.randomArtist);
});



// ////
// // Find last artist Registered
// ////

</script>
