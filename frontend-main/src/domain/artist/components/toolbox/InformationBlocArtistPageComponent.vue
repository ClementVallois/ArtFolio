<template>
    <div
        class="  border border-gray-300 rounded-lg max-w-[95%] p-[1rem] my-[1rem] flex items-center lg:flex-col lg:w-[20vw] lg:h-[95vh] lg:ml-[1rem] lg:sticky lg:top-4">
        <div class="flex flex-col w-[35%] items-center  lg:w-[100%] ">
            <img :src="profilePicture" alt="artist-profile-picture"
                class="relative  rounded-lg overflow-hidden max-w-[100%] lg:max-w-[60%]"
                loading="lazy"
                >
            <p class="text-[0.7rem] font-lightText lg:text-center"> {{ artistStore.artist.username }}</p>
        </div>
        <div class="flex flex-col px-[1rem]  lg:h-[100%]">
            <p class="text-xs font-boldText pt-[1rem] lg:text-base "> {{ artistStore.artist.firstName }} {{ artistStore.artist.lastName }}</p>
            <p class="text-xs font-lightText lg:pt-[1rem] lg:text-base"> {{ artistStore.artist.description }}</p>
            <div class="pt-[1rem] lg:h-[100%] lg:flex lg:justify-center">
                <ButtonComponent textButton="Contacter" class="lg:self-end"></ButtonComponent>
            </div>
        </div>
    </div>
</template>

<script setup>
import {  defineProps,onMounted, ref } from 'vue';
import { useStoreArtist } from '@/domain/artist/store/ArtistStore.js';
import { userService } from '@/domain/user/service/UserService'
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';

const props = defineProps({
    artistId: String,
});

const profilePicture=ref(null)


// Récupérez l'artist demandé
const artistStore = useStoreArtist();
onMounted(async () => {
    await artistStore.getArtistById(props.artistId);
    const url = await userService().getUserProfilePicture(props.artistId)
    profilePicture.value = url
});

</script>