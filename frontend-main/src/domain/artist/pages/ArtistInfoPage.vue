<template v-if="authenticationStore.profile != null">
    <div class="container mx-auto px-4 py-6">
        <div class="flex justify-center items-center">
            <TitleComponent title="Vos informations personnelles" class="text-[3rem] lg:text-[4rem] py-[3rem] ">
            </TitleComponent>
        </div>
        <!-- Profile Picture Form -->
        <form action="" class="flex flex-col items-center w-full mb-8">
            <div class="flex flex-col items-center w-full max-w-md">
                <img :src="authenticationStore.profilePicture" alt="Profile Picture"
                    class="w-32 h-32 lg:w-45 lg:h-45 rounded-tl-lg rounded-br-lg object-cover mb-4 border-2 border-gray-300" />
                <input type="file" class="file-input file-input-bordered text-sm w-full max-w-xs"
                    @change="handleFileChange" />
            </div>
        </form>

        <!-- Profile Information Form -->
        <form action="" class="flex flex-col items-center w-full" @submit.prevent="submitForm" method="patch"
            enctype="multipart/form-data">
            <div class="flex flex-col w-full max-w-md mb-4">
                <label for="username" class="mb-1 text-sm font-medium text-gray-900">Votre nom d'utilisateur</label>
                <input id="username" type="text" v-model="authenticationStore.profile.username"
                    class="input input-bordered w-full" />
            </div>

            <div class="flex flex-col w-full max-w-md mb-4">
                <label for="firstName" class="mb-1 text-sm font-medium text-gray-900">Votre prénom</label>
                <input id="firstName" type="text" v-model="authenticationStore.profile.firstName"
                    class="input input-bordered w-full" />
            </div>

            <div class="flex flex-col w-full max-w-md mb-4">
                <label for="lastName" class="mb-1 text-sm font-medium text-gray-900">Votre nom</label>
                <input id="lastName" type="text" v-model="authenticationStore.profile.lastName"
                    class="input input-bordered w-full" />
            </div>

            <div class="flex flex-col w-full max-w-md mb-4">
                <label for="birthDate" class="mb-1 text-sm font-medium text-gray-900">Votre date de naissance</label>
                <input id="birthDate" type="date" v-model="authenticationStore.profile.birthDate"
                    class="input input-bordered w-full" />
            </div>

            <div class="flex flex-col w-full max-w-md mb-4">
                <label for="description" class="block mb-1 text-sm font-medium text-gray-900">Description</label>
                <textarea id="description" v-model="authenticationStore.profile.description"
                    class="textarea textarea-bordered h-40 resize-none w-full" placeholder="Bio"></textarea>
            </div>

            <div class="pt-4 flex justify-center w-full">
                <ButtonComponent textButton="Modifier" class="lg:self-end" />
            </div>
        </form>
    </div>
    <!-- <form action="" class="flex flex-col items-center w-[100vw]">
        <div class="flex flex-col w-[90vw] pb-[1rem]">
        <img :src="authenticationStore.profilePicture" alt="Profile Picture"
            class="w-[12rem] h-[12rem] rounded-tl-lg rounded-br-lg object-cover mb-[1rem] border-2 border-gray-300">
        <input type="file" class="file-input file-input-bordered text-[0.8rem] w-full max-w-xs" />
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
 
   </form> -->
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
import { onMounted, toRaw, ref } from 'vue';
import { PersonalDataRequest } from "@/model/PersonalDataRequestModel";
import { useStoreUser } from "@/domain/user/store/UserStore";


const userStore = useStoreUser();
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
const { user } = useAuth0()
const profilePictureFile = ref(null);


const handleFileChange = (event) => {
    profilePictureFile.value = event.target.files[0];
};

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
        // Close the modal and reset body overflow
        showDataModal.value = false;
        document.body.style.overflow = '';

        // Send the data request
        const response = await userStore.createPersonalDataRequest(JSON.stringify({ userId: authenticationStore.profile.id }));

        // Debugging statement to check the response

        if (response.error === 'Request already exists') {
            alertError.value = true;
            textAlert.value = "Vous avez déjà une demande en cours.";
        } else if (response instanceof PersonalDataRequest) {
            alertError.value = false;
            textAlert.value = "Votre demande a bien été envoyée";
        } else {
            alertError.value = true;
            textAlert.value = "Une erreur est survenue. Veuillez réessayer.";
        }

        showAlert.value = true;
    } catch (error) {
        console.error('Error:', error);
        storeGlobal.logError(error, 6);
        alertError.value = true;
        textAlert.value = "Une erreur est survenue. Veuillez réessayer.";
        showAlert.value = true;
    }
}

// Fonction pour comparer les champs modifiés et envoyer uniquement les modifications
const submitForm = async () => {
    const modifiedData = new FormData();
    let isModified = false;

    for (const key in authenticationStore.profile) {
        if (authenticationStore.profile[key] !== originalData[key]) {
            modifiedData.append(key, authenticationStore.profile[key]);
            isModified = true;
        }
    }

    // Add the profile picture if it was changed
    if (profilePictureFile.value) {
        modifiedData.append('profilePicture', profilePictureFile.value);
        isModified = true;
    }

    if (isModified) {
        try {
            let response = await artistStore.modifyArtist(authenticationStore.profile.id, modifiedData);
            if (response.status == 200) {
                alertError.value = false;
                textAlert.value = "Vos nouvelles données ont bien été enregistrées";
                showAlert.value = true;
            } else {
                textAlert.value = "Aïe on dirait qu'une erreur est survenue.";
                alertError.value = true;
                showAlert.value = true;
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            textAlert.value = "Une erreur est survenue lors de la mise à jour du profil.";
            alertError.value = true;
            showAlert.value = true;
        }
    } else {
        textAlert.value = "Aucune modification n'a été détectée.";
        alertError.value = true;
        showAlert.value = true;
    }
};


</script>