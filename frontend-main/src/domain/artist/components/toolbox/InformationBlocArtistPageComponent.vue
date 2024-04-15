<template>
    <div
        class="  border rounded-lg max-w-[95%] p-[1rem] my-[1rem] flex items-center lg:flex-col lg:w-[20vw] lg:h-[95vh] lg:ml-[1rem] lg:sticky lg:top-4">
        <img src="@/assets/img/profil.png" alt=""
            class="relative  rounded-lg overflow-hidden max-w-[20%] lg:max-w-[60%]">
        <div class="flex flex-col px-[1rem] lg:pt-[2rem] lg:h-[100%]">
            <p class="text-xs font-semibold lg:text-base"> {{ artist.first_name }} {{ artist.last_name }}</p>
            <p class="text-xs lg:pt-[1rem] lg:text-base"> {{ artist.description }}</p>
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
    id: String,

});

// Récupérez l'artist demandé
const storeArtist = artistStore();
const allArtistData = JSON.parse(JSON.stringify(toRaw(storeArtist.getAllArtist)));
const artist = allArtistData.find(artist => artist.uuid === props.id);

</script>