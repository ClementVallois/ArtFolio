<template>
    <div class="w-[90%] m-auto flex flex-col items-center py-[2rem] lg:py-[5rem]">
        <TitleComponent title="Création de votre post" class="text-[2.5rem] lg:text-[3rem] ml-[0rem]"></TitleComponent>
        <form @submit.prevent="submitForm" class="w-[100%] mx-auto flex flex-col items-center py-[1rem]">
            <div class="pt-[1rem] flex flex-col items-center w-[100%]">
                <label class="block mb-2 text-[1rem] font-medium text-gray-900" for="user_avatar">Importer votre
                    photo</label>
                <input @change="handleFileChange" type="file"
                    class="file-input file-input-bordered w-[90%] text-[0.8rem] lg:w-[40%]" />
            </div>
            <div class="pt-[1rem] flex flex-col items-center w-[100%]">
                <label for="message" class="block mb-2 text-[1rem] font-medium text-gray-900 ">Description</label>
                <textarea v-model="postDescription"
                    class="textarea textarea-bordered h-[20vh] w-[90%] resize-none lg:w-[40%] "
                    placeholder="Bio"></textarea>
            </div>

            <div class="pt-[2rem] flex justify-center w-full ">
                <ButtonComponent textButton="Poster" class="lg:self-end"></ButtonComponent>
            </div>
        </form>
    </div>
    <AlertComponent v-if="showAlert" v-model:alertError="alertError" @closeAlert="handleCloseAlert"
        v-model:textAlert="defaultTextAlert"></AlertComponent>
</template>

<script setup>
import AlertComponent from '@/components/toolBox/AlertComponent.vue';
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
import { Post } from '@/domain/artist/model/PostModel.js';
import { ref, computed, toRaw } from 'vue';
import { useGlobalStore } from '@/store/GlobalStore.js';
import { useStorePost } from '@/domain/artist/store/PostStore';
import { useStoreArtist } from '@/domain/artist/store/ArtistStore';
import { useAuthenticationPersistStore } from '@/domain/authentification/store/AuthenticationPersistStore'

// Store initialisation
const storeGlobal = useGlobalStore();
const postStore = useStorePost();
const artistStore = useStoreArtist();
const authenticationStore = useAuthenticationPersistStore()

///
// Ref
///
const filePostPicture = ref(null);
const typePostPicture = ref(null);
const postDescription = ref(null);
const showAlert = ref(false);
const defaultTextAlert = ref('Vous devez remplir tous les champs présents.');
const newPost = ref(null)
const alertError = ref(true);
const artistId = artistStore.artistId;

// permet de remettre à false "showAlert" lors de la fermeture de l'erreur d'alerte 
const handleCloseAlert = () => {
    showAlert.value = false;
};

const handleFileChange = (event) => {
    filePostPicture.value = event.target.files[0];
    typePostPicture.value = event.target.files[0].type;
};

// Calcul de la validité du formulaire
const isFormValid = computed(() => {
    try {
        if (filePostPicture.value && postDescription.value) {
            if (filePostPicture.value && (typePostPicture.value == "image/png" || typePostPicture.value == "image/jpg" || typePostPicture.value == "image/jpeg")) {
                const post = new Post(null, false, postDescription.value, artistId);
                post.validateDescription(postDescription.value);
                newPost.value = post;
                return true;
            } else {
                // Vérifier si les images sont autorisées
                defaultTextAlert.value = "Les images autorisées sont png, jpg, jpeg";
                alertError.value = true;
                showAlert.value = true;
            }
        } else {
            alertError.value = true;
            showAlert.value = true;
        }

    } catch (error) {
        if (error.message.includes("Model")) {
            const errorMessageWithoutModel = error.message.replace("Model", "");
            defaultTextAlert.value = errorMessageWithoutModel;
            alertError.value = true;
            showAlert.value = true;
        }
    }
});

// Méthode pour soumettre le formulaire avec validation
const submitForm = async () => {
    // Vérifiez si le formulaire est valide
    if (isFormValid.value) {
        try {
            let data = new FormData();
            const { isPinned, description: postDescription, userId } = toRaw(newPost.value);

            /// Post
            data.append('isPinned', isPinned);
            data.append('description', postDescription);
            data.append('artistId', authenticationStore.profile.id);

            /// Asset
            data.append('postPicture', filePostPicture.value);
            for (var pair of data.entries()) {
            }

            let response = await postStore.createPost(data);
            if (response.status == 201) {
                defaultTextAlert.value = "Votre post à bien été posté";
                alertError.value = false;
                showAlert.value = true;
            }
        } catch (error) {
            storeGlobal.logError(error, 6);
        }
    } else {
        // Sinon, affichez la popup
        alertError.value = true;
        showAlert.value = true;
    }
};
</script>