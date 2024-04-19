<template>
    <TitleComponent title="Vos informations personnelles" class="text-[3rem] lg:text-[4rem] mt-[3rem]"> </TitleComponent>
    <label for=""> Votre prénom</label>
    <input type="text"  v-model="artist.firstName" class="input input-bordered w-full max-w-xs" />
    <label for=""> Votre nom</label>
    <input type="text"  v-model="artist.lastName" class="input input-bordered w-full max-w-xs" />
</template>

<script setup>
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import { useStoreArtist } from '@/domain/artist/store/ArtistStore';
import {  defineProps, ref, onMounted } from 'vue';

// const props = defineProps({
//     artistId: String,
// });


// Récupérez l'artist demandé
const artistStore = useStoreArtist();
const artist = ref([])
onMounted(async () => {
    artist.value = await artistStore.getArtistById("d53b730c-18ff-449b-a5f2-937f65f615ca");
    console.log(artist.value);
});

</script>