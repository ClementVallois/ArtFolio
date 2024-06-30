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
        <input type="text"  v-model="userStore.user.username" class="input input-bordered w-full max-w-xs" />
    </div>
    <div class="flex flex-col w-[90vw] pb-[1rem]">
        <label for=""> Votre prénom</label>
        <input type="text"  v-model="userStore.user.firstName" class="input input-bordered w-full max-w-xs" />
    </div>
     <div class="flex flex-col w-[90vw] pb-[1rem]">
        <label for=""> Votre nom</label>
        <input type="text"  v-model="userStore.user.lastName" class="input input-bordered w-full max-w-xs" />
     </div>

     <div class="flex flex-col w-[90vw] pb-[1rem]">
        <label for=""> Votre date de naissance</label>
        <input type="date"  v-model="userStore.user.birthDate" class="input input-bordered w-full max-w-xs lg:w-[40%]" />
     </div>
     <div class="pt-[2rem] flex justify-center w-full ">
        <ButtonComponent textButton="Modifier" class="lg:self-end"></ButtonComponent>
    </div>
 
   </form>
   <AlertComponent v-if="showAlert" v-model:alertError="alertError" @closeAlert="handleCloseAlert" v-model:textAlert="defaultTextAlert"></AlertComponent>
   


   <div class="flex flex-col justify-center mb-[2rem]">
        <SecondTitleComponent title="Je souhaite supprimer mon compte" class="mt-[1.5rem] self-center"></SecondTitleComponent>
        <div class="pt-[2rem] flex justify-center w-full ">
            <ButtonComponent @click="openModal" textButton="Supprimer" class=" lg:self-end"></ButtonComponent>
        </div>
   </div>

</template>

<script setup>

import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
import AlertComponent from '@/components/toolBox/AlertComponent.vue'; 
import { useStoreUser } from '@/domain/user/store/UserStore';
import SecondTitleComponent from '@/components/toolBox/SecondTitleComponent.vue';
import ModalComponent from '@/components/toolBox/ModalComponent.vue';
import { useGlobalStore } from '@/store/GlobalStore.js';
import { onMounted, toRaw, ref} from 'vue';

const userStore = useStoreUser();
const storeGlobal = useGlobalStore();
let originalData; 
const showAlert = ref(false);
const alertError = ref(true);
const defaultTextAlert = ref('Vous devez remplir tous les champs présents.');
const showModal = ref(false);
const isProfilDeleted = ref(false);



/// TODO: faire en sorte de comparer l'artist original et les new data
// Fonction pour masquer l'alerte d'erreur
const handleCloseAlert = () => {
    showAlert.value = false;
};

onMounted(async () => {
    const userData = await userStore.getUserById(userStore.userId);
    originalData = {... userData} ; 
});

// Fonctionnement modal delete
function openModal() {
    showModal.value = true;
    document.body.style.overflow = 'hidden';
}

const closeModal = () => {
    showModal.value = false;
    document.body.style.overflow = '';
}


async function handleDelete(deleteStatus) {
    isProfilDeleted.value = deleteStatus;
    if (isProfilDeleted.value) {
        try {
            showModal.value = false;
            document.body.style.overflow = '';
            console.log('yes');
             let response =  await userStore.deleteUser(userStore.userId);
            if (response.status == 200) {
                alertError.value = false;
                showAlert.value = true;
            }
           
        } catch (error) {
            storeGlobal.logError(error, 6);
        }
    } 
}

// Fonction pour comparer les champs modifiés et envoyer uniquement les modifications
const submitForm = async () => {
    const modifiedData = {};
    let isModified = false; 
    for (const key in userStore.user) {
    //     console.log(key);
    //    console.log(artistStore.artist[key], originalData[key]);
        if (userStore.user[key] !== originalData[key]) {
            modifiedData[key] = userStore.user[key];
            isModified = true; 
        }
    }
    if (isModified) {
        console.log(toRaw(userStore.userId));
        console.log('Champs modifiés :', modifiedData);
        let response = await artistStore.modifyArtist(userStore.userId, JSON.stringify(modifiedData));
        // TODO: fonctionnel mais reste à déconnecter de Auth0 et suppression d'auth0 
    
    } else {
        alertError.value = true;
        showAlert.value = true;
    }
};


</script>