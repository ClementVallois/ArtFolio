<template>
    <TitleComponent title="Vos informations personnelles" class="text-[3rem] lg:text-[4rem] py-[3rem] "> </TitleComponent>
    <form action="" class="flex flex-col items-center w-[100vw]">

    <div class="flex flex-col w-[90vw] pb-[1rem]">
        <img src="@/assets/img/profil.png" alt=""
        class="relative max-w-[15%] rounded-lg overflow-hidden max-w-[100%] lg:max-w-[5%] pb-[1rem]">
        <input type="file" class="file-input file-input-bordered text-[0.8rem]  w-full max-w-xs " />
    </div>
   </form>
   <form action="" class="flex flex-col items-center w-[100vw] pb-[1rem]" @submit.prevent="submitForm">

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

     <div class="pt-[2rem] flex justify-center w-full ">
        <ButtonComponent textButton="Modifier" class="lg:self-end"></ButtonComponent>
    </div>
 
   </form>
   <AlertComponent v-if="showAlert" v-model:alertError="alertError" @closeAlert="handleCloseAlert" v-model:textAlert="defaultTextAlert"></AlertComponent>

</template>

<script setup>
import { ref } from 'vue';
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
import AlertComponent from '@/components/toolBox/AlertComponent.vue'; 
import { useStoreArtist } from '@/domain/artist/store/ArtistStore';
import { onMounted } from 'vue';

const artistStore = useStoreArtist();
const originalData = ref({}); 
const showAlert = ref(false);
const alertError = ref(true);
const defaultTextAlert = ref('Vous devez remplir tous les champs présents.');

/// TODO: faire en sorte de comparer l'artist original et les new data
// Fonction pour masquer l'alerte d'erreur
const handleCloseAlert = () => {
    showAlert.value = false;
};

onMounted(async () => {
    const artistData = await artistStore.getArtistById("4a16705f-f810-42b9-9da8-0b1e157db8ee");
    originalData.value = { ...artistData }; // Créez une copie profonde des données de l'artiste
    console.log(originalData.value);
});

// Fonction pour comparer les champs modifiés et envoyer uniquement les modifications
const submitForm = () => {
    const modifiedData = {};
    let isModified = false; 
    console.log(artistStore.artist);
    for (const key in artistStore.artist) {
        console.log(key);
        console.log(artistStore.artist[key], originalData.value[key]);
        if (artistStore.artist[key] !== originalData.value[key]) {
            modifiedData[key] = artistStore.artist[key];
            isModified = true; 
        }
    }
    if (isModified) {
        console.log('Champs modifiés :', modifiedData);
    } else {
        alertError.value = true;
        showAlert.value = true;
    }
};


</script>