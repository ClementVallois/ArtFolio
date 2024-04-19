<template>
    <TitleComponent title="Vos informations personnelles" class="text-[3rem] lg:text-[4rem] py-[3rem] "> </TitleComponent>
    <form action="" class="flex flex-col items-center w-[100vw]">

    <div class="flex flex-col w-[90vw] pb-[1rem]">
        <img src="@/assets/img/profil.png" alt=""
        class="relative max-w-[15%] rounded-lg overflow-hidden max-w-[100%] lg:max-w-[5%] pb-[1rem]">
        <input type="file" class="file-input file-input-bordered text-[0.8rem]  w-full max-w-xs " />
    </div>
   </form>
   <form action="" class="flex flex-col items-center w-[100vw] pb-[1rem]">

    <div class="flex flex-col w-[90vw] pb-[1rem]">
        <label for=""> Votre nom d'utilisateur</label>
        <input type="text"  v-model="artistStore.artist.username" class="input input-bordered w-full max-w-xs" />
    </div>
    <div class="flex flex-col w-[90vw] pb-[1rem]">
        <label for=""> Votre prénom</label>
        <input type="text"  v-model="artistStore.artist.firstName" class="input input-bordered w-full max-w-xs" />
    </div>
     <div class="flex flex-col w-[90vw] pb-[1rem]">
        <label for=""> Votre nom</label>
        <input type="text"  v-model="artistStore.artist.lastName" class="input input-bordered w-full max-w-xs" />
     </div>

     <div class="flex flex-col w-[90vw] pb-[1rem]">
        <label for=""> Votre date de naissance</label>
        <input type="date"  v-model="artistStore.artist.birthDate" class="input input-bordered w-full max-w-xs lg:w-[40%]" />
     </div>

     <div class="flex flex-col w-[90vw] pb-[1rem]">
        <label for="message" class="block mb-2 text-[1rem] font-medium text-gray-900 ">Description</label>
        <textarea  v-model="artistStore.artist.description" class="textarea textarea-bordered h-[20vh] resize-none lg:w-[40%] " placeholder="Bio"></textarea>   
     </div>

     <div class="flex flex-col w-[90vw] pb-[1rem]">
        <ButtonComponent textButton="Modifier" class="w-[30vw] lg:self-end lg:w-[10vw]"></ButtonComponent>
    </div>
 
   </form>

</template>

<script setup>
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
import { useStoreArtist } from '@/domain/artist/store/ArtistStore';
import {   onMounted } from 'vue';

// const props = defineProps({
//     artistId: String,
// });

// Récupérez l'artist demandé
const artistStore = useStoreArtist();
onMounted(async () => {
    await artistStore.getArtistById("4a16705f-f810-42b9-9da8-0b1e157db8ee");

});
</script>