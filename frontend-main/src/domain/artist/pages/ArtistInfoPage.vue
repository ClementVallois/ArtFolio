<template v-if="authenticationStore.profile != null">
    <TitleComponent title="Vos informations personnelles" class="text-[3rem] lg:text-[4rem] py-[3rem] ">
    </TitleComponent>
    <form action="" class="flex flex-col items-center w-[100vw]">

        <div class="flex flex-col w-[90vw] pb-[1rem]">
            <img :src="authenticationStore.profilePicture" alt="profile Picture"
                class="relative max-w-[15%] rounded-lg overflow-hidden max-w-[100%] lg:max-w-[5%] pb-[1rem]">
            <input type="file" class="file-input file-input-bordered text-[0.8rem]  w-full max-w-xs " />
        </div>
    </form>
    <form action="" class="flex flex-col items-center w-[100vw] pb-[1rem]" @submit.prevent="submitForm">

        <div class="flex flex-col w-[90vw] pb-[1rem]">
            <label for=""> Votre nom d'utilisateur</label>
            <input type="text" v-model="authenticationStore.profile.username"
                class="input input-bordered w-full max-w-xs" />
        </div>
        <div class="flex flex-col w-[90vw] pb-[1rem]">
            <label for=""> Votre prénom</label>
            <input type="text" v-model="authenticationStore.profile.firstName"
                class="input input-bordered w-full max-w-xs" />
        </div>
        <div class="flex flex-col w-[90vw] pb-[1rem]">
            <label for=""> Votre nom</label>
            <input type="text" v-model="authenticationStore.profile.lastName"
                class="input input-bordered w-full max-w-xs" />
        </div>

        <div class="flex flex-col w-[90vw] pb-[1rem]">
            <label for=""> Votre date de naissance</label>
            <input type="date" v-model="authenticationStore.profile.birthDate"
                class="input input-bordered w-full max-w-xs lg:w-[40%]" />
        </div>

        <div class="flex flex-col w-[90vw] pb-[1rem]">
            <label for="message" class="block mb-2 text-[1rem] font-medium text-gray-900 ">Description</label>
            <textarea v-model="authenticationStore.profile.description"
                class="textarea textarea-bordered h-[20vh] resize-none lg:w-[40%] " placeholder="Bio"></textarea>
        </div>

        <div class="pt-[2rem] flex justify-center w-full ">
            <ButtonComponent textButton="Modifier" class="lg:self-end"></ButtonComponent>
        </div>

    </form>
    <AlertComponent v-if="showAlert" :alertError="alertError" @closeAlert="handleCloseAlert" :textAlert="textAlert">
    </AlertComponent>



    <div class="flex flex-col justify-center mb-[2rem]">
        <SecondTitleComponent title="Je souhaite supprimer mon compte" class="mt-[1.5rem] self-center">
        </SecondTitleComponent>
        <div class="pt-[2rem] flex justify-center w-full ">
            <ButtonComponent @click="openDeleteModal" textButton="Supprimer" class=" lg:self-end"></ButtonComponent>
        </div>
    </div>
    <ModalDeleteComponent v-if="showDeleteModal" @closeModals="closeDeleteModal" @deleteData="handleDelete"
        textModal="Est vous sûr de vouloir supprimer votre profil ? Attention cette action est irréversible">
    </ModalDeleteComponent>


    <div class="flex flex-col justify-center mb-[2rem]">
        <SecondTitleComponent title="Je veux récupérer mes données personnelles" class="mt-[1.5rem] self-center" />
        <div class="pt-[2rem] flex justify-center w-full">
            <ButtonComponent @click="openPersonalDataModal" textButton="Faire une demande" class="lg:self-end" />
        </div>
    </div>
    <ModalDataComponent v-if="showDataModal" @closeModals="closePersonalDataModal"
        @createPersonalDataRequest="handleDataRequest"
        textModal="Voulez-vous demander une copie de vos données personnelles ?"></ModalDataComponent>


</template>

<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import { useRouter } from 'vue-router'
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
import AlertComponent from '@/components/toolBox/AlertComponent.vue';
import { useStoreArtist } from '@/domain/artist/store/ArtistStore';
import { useAuthenticationPersistStore } from '@/domain/authentification/store/AuthenticationPersistStore'
import SecondTitleComponent from '@/components/toolBox/SecondTitleComponent.vue';
import { useGlobalStore } from '@/store/GlobalStore.js';
import ModalDeleteComponent from '@/components/toolBox/ModalDeleteComponent.vue';
import ModalDataComponent from '@/components/toolBox/ModalDataComponent.vue';
import { userService } from '@/domain/user/service/UserService'
import { onMounted, toRaw, ref } from 'vue';

const router = useRouter()
const artistStore = useStoreArtist();
const storeGlobal = useGlobalStore();
const authenticationStore = useAuthenticationPersistStore()
let originalData;
const showAlert = ref(false);
const alertError = ref(true);
const textAlert = ref('Vous devez remplir tous les champs présents.');
const showDeleteModal = ref(false);
const showDataModal = ref(false);
const isProfilDeleted = ref(false);
const profilePicture = ref(null)
const { user } = useAuth0()


/// TODO: faire en sorte de comparer l'artist original et les new data
// Fonction pour masquer l'alerte d'erreur
const handleCloseAlert = () => {
    showAlert.value = false;
};

onMounted(async () => {
    // const artistData = await artistStore.getArtistById(authenticationStore.profileId);
    // originalData = {... artistData} ;
    const artistData = authenticationStore.profile
    //create a deep copy if not reference are the same and objects will move at the same time
    originalData = { ...toRaw(artistData) };
});

// Fonctionnement modal delete
function openDeleteModal() {
    showDeleteModal.value = true;
    document.body.style.overflow = 'hidden';
}

const closeDeleteModal = () => {
    showDeleteModal.value = false;
    document.body.style.overflow = '';
}

function openPersonalDataModal() {
    showDataModal.value = true;
    document.body.style.overflow = 'hidden';
}

const closePersonalDataModal = () => {
    showDataModal.value = false;
    document.body.style.overflow = '';
}


async function handleDelete(deleteStatus) {
    isProfilDeleted.value = deleteStatus;
    if (isProfilDeleted.value) {
        try {
            showDeleteModal.value = false;
            document.body.style.overflow = '';
            // let response =  await artistStore.deleteArtist(authenticationStore.profile.id, user.value.sub);
            let response = await authenticationStore.deleteProfile('artist', authenticationStore.profile.id, user.value.sub)
            if (response.status == 200) {
                alertError.value = false;
                showAlert.value = true;
            }
            router.push('/')
        } catch (error) {
            storeGlobal.logError(error, 6);
        }
    }
}

async function handleDataRequest() {
    try {
        // TODO : Implement the logic to handle data request here
        showDataModal.value = false;
        document.body.style.overflow = '';

        alertError.value = false;
        textAlert.value = "Votre demande de données personnelles a été prise en compte.";
        showAlert.value = true;
    } catch (error) {
        textAlert.value = "Une erreur est survenue lors de la demande de vos données.";
        alertError.value = true;
        showAlert.value = true;
        storeGlobal.logError(error, 6);
    }
}

// Fonction pour comparer les champs modifiés et envoyer uniquement les modifications
const submitForm = async () => {
    const modifiedData = {};
    let isModified = false;
    // console.log(authenticationStore.profile);
    for (const key in authenticationStore.profile) {
        //     console.log(key);
        //    console.log(authenticationStore.profile[key], originalData[key]);
        if (authenticationStore.profile[key] !== originalData[key]) {
            modifiedData[key] = authenticationStore.profile[key];
            isModified = true;
        }
    }
    if (isModified) {
        // console.log(toRaw(authenticationStore.profileId));
        // console.log('Champs modifiés :', modifiedData);
        let response = await artistStore.modifyArtist(authenticationStore.profile.id, JSON.stringify(modifiedData));
        if (response.status == 200) {
            alertError.value = false;
            textAlert.value = "Vos nouvelles données ont bien été enregistrées"
            showAlert.value = true;
        } else {
            textAlert.value = "Aïe on dirait qu'une erreur est survenue."
            alertError.value = true;
            showAlert.value = true;
        }
    } else {
        textAlert.value = "Vous devez remplir tous les champs présents."
        alertError.value = true;
        showAlert.value = true;
    }
};


</script>