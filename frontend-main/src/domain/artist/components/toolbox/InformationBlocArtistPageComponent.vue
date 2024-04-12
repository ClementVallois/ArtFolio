<template>
    <div class="border rounded-lg max-w-[95%] p-[1rem] my-[1rem] flex items-center">
        <img src="@/assets/img/image.png" alt="" class="relative  rounded-lg overflow-hidden max-w-[20%]">
        <div class="flex flex-col px-[1rem]">
            <p class="text-xs"> {{ artist.first_name }}</p>
            <p class="text-xs"> {{ artist.last_name }}</p>
            <p class="text-xs"> {{ artist.description }}</p>
        </div>

    </div>
</template>

<script setup>
import { toRaw, defineProps } from 'vue';
import { artistStore } from '@/domain/artist/store/artistStore';


const props = defineProps({
    id: String
});

// Récupérez l'artist demandé
const storeArtist = artistStore();
const allArtistData = JSON.parse(JSON.stringify(toRaw(storeArtist.getAllArtist)));
const artist = allArtistData.find(artist => artist.uuid === props.id);

</script>