<template>
    <div
        class="  border border-gray-300 rounded-lg max-w-[95%] p-[1rem] my-[1rem] flex items-center lg:flex-col lg:w-[20vw] lg:h-[95vh] lg:ml-[1rem] lg:sticky lg:top-4">
        <div class="flex flex-col w-[35%] items-center  lg:w-[100%] ">
            <img src="@/assets/img/profil.png" alt=""
                class="relative  rounded-lg overflow-hidden max-w-[100%] lg:max-w-[60%]">
            <p class="text-[0.7rem] font-lightText lg:text-center"> {{ artist.username }}</p>
        </div>
        <div class="flex flex-col px-[1rem]  lg:h-[100%]">

            <p class="text-xs font-boldText pt-[1rem] lg:text-base "> {{ artist.first_name }} {{ artist.last_name }}</p>
            <p class="text-xs font-lightText lg:pt-[1rem] lg:text-base"> {{ artist.description }}</p>
            <div class="pt-[1rem] lg:h-[100%] lg:flex lg:justify-center">
                <ButtonComponent textButton="Contacter" class="lg:self-end"></ButtonComponent>
            </div>
        </div>
    </div>
</template>

<script setup>
import { toRaw, defineProps } from 'vue';
import { artistStore } from '@/domain/artist/store/artistStore';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';

const props = defineProps({
    artistId: String,
});


// Récupérez l'artist demandé
const storeArtist = artistStore();
console.log(storeArtist.getAllArtist)
const allArtistData = JSON.parse(JSON.stringify(toRaw(storeArtist.getAllArtist)));

const artist = allArtistData.find(artist => artist.id === props.artistId);

</script>