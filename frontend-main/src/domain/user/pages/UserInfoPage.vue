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
        <input type="text"  v-model="authenticationStore.profile.username" class="input input-bordered w-full max-w-xs" />
    </div>
    <div class="flex flex-col w-[90vw] pb-[1rem]">
        <label for=""> Votre prénom</label>
        <input type="text"  v-model="authenticationStore.profile.firstName" class="input input-bordered w-full max-w-xs" />
    </div>
     <div class="flex flex-col w-[90vw] pb-[1rem]">
        <label for=""> Votre nom</label>
        <input type="text"  v-model="authenticationStore.profile.lastName" class="input input-bordered w-full max-w-xs" />
     </div>

     <div class="flex flex-col w-[90vw] pb-[1rem]">
        <label for=""> Votre date de naissance</label>
        <input type="date"  v-model="authenticationStore.profile.birthDate" class="input input-bordered w-full max-w-xs lg:w-[40%]" />
     </div>
     <div class="pt-[2rem] flex justify-center w-full ">
        <ButtonComponent textButton="Modifier" class="lg:self-end"></ButtonComponent>
    </div>
 
   </form>
   <AlertComponent v-if="showAlert" :alertError="alertError" @closeAlert="handleCloseAlert" :textAlert="textAlert"></AlertComponent>
   


   <div class="flex flex-col justify-center mb-[2rem]">
        <SecondTitleComponent title="Je souhaite supprimer mon compte" class="mt-[1.5rem] self-center"></SecondTitleComponent>
        <div class="pt-[2rem] flex justify-center w-full ">
            <ButtonComponent @click="openModal" textButton="Supprimer" class=" lg:self-end"></ButtonComponent>
        </div>
   </div>

   <ModalComponent v-if="showModal" @closeModals="closeModal" @deleteData="handleDelete" textModal="Voulez-vous vraiment supprimer votre profil ?"></ModalComponent>
</template>

<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
import AlertComponent from '@/components/toolBox/AlertComponent.vue'; 
import { useStoreUser } from '@/domain/user/store/UserStore';
import { useAuthenticationPersistStore } from '@/domain/authentification/store/AuthenticationPersistStore'
import SecondTitleComponent from '@/components/toolBox/SecondTitleComponent.vue';
import ModalComponent from '@/components/toolBox/ModalComponent.vue';
import { useGlobalStore } from '@/store/GlobalStore.js';
import { onMounted, toRaw, ref} from 'vue';

const userStore = useStoreUser();
const storeGlobal = useGlobalStore();
const authenticationStore = useAuthenticationPersistStore()
let originalData; 
const showAlert = ref(false);
const alertError = ref(true);
const textAlert = ref('Vous devez remplir tous les champs présents.');
const showModal = ref(false);
const isProfilDeleted = ref(false);
const { user } = useAuth0()



/// TODO: faire en sorte de comparer l'artist original et les new data
// Fonction pour masquer l'alerte d'erreur
const handleCloseAlert = () => {
    showAlert.value = false;
};

onMounted(async () => {
    const userData = authenticationStore.profile
    //create a deep copy if not reference are the same and objects will move at the same time
    originalData = { ...toRaw(userData) }; 
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
            let response =  await userStore.deleteUser(authenticationStore.profile.id, user.value.sub);
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
    for (const key in authenticationStore.profile) {
        // console.log(key);
        // console.log(authenticationStore.profile[key], originalData[key]);
        if (authenticationStore.profile[key] !== originalData[key]) {
            modifiedData[key] = authenticationStore.profile[key];
            isModified = true; 
        }
    }
    if (isModified) {
        // console.log('Champs modifiés :', modifiedData);
        let response = await userStore.modifyUser(authenticationStore.profile.id, JSON.stringify(modifiedData));
        if(response.status == 200){
            alertError.value = false;
            textAlert.value = "Vos nouvelles données ont bien été enregistrées"
            showAlert.value = true;
        }

    } else {
        textAlert.value="Vous devez remplir tous les champs présents."
        alertError.value = true;
        showAlert.value = true;
    }
};


</script>