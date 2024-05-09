<template>
    <div class="w-[90%] m-auto flex flex-col items-center py-[2rem] lg:py-[5rem]">
        <TitleComponent title="Création de votre post" class="text-[2.5rem] lg:text-[3rem] ml-[0rem]" ></TitleComponent>
        <form  @submit.prevent="submitForm" class="w-[100%] mx-auto flex flex-col items-center py-[1rem]">
            <div class="pt-[1rem] flex flex-col items-center w-[100%]">
                <label class="block mb-2 text-[1rem] font-medium text-gray-900" for="user_avatar">Importer votre photo</label>
                <input @change="handleFileChange" type="file" class="file-input file-input-bordered w-[90%] text-[0.8rem] lg:w-[40%]" />
            </div>
            <div class="pt-[1rem] flex flex-col items-center w-[100%]">
                <label for="message" class="block mb-2 text-[1rem] font-medium text-gray-900 ">Description</label>
                <textarea v-model="postDescription" class="textarea textarea-bordered h-[20vh] w-[90%] resize-none lg:w-[40%] " placeholder="Bio"></textarea>    
            </div>

            <div class="pt-[2rem] flex justify-center w-full ">
                <ButtonComponent textButton="Poster" class="lg:self-end"></ButtonComponent>
            </div>
        </form>
    </div>
    <ErrorAlertComponent v-if="showErrorAlert" @closeErrorAlert="handleCloseErrorAlert" v-model:textAlert="defaultTextAlert"></ErrorAlertComponent>
</template>

<script setup>
import ErrorAlertComponent from '@/components/toolBox/ErrorAlertComponent.vue';
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
import { Post } from '@/domain/artist/model/PostModel.js';
import { ref, computed, toRaw } from 'vue';
import { useGlobalStore } from '@/store/GlobalStore.js';
import { useStorePost } from '@/domain/artist/store/PostStore';
import { useStoreArtist } from '@/domain/artist/store/ArtistStore';

// Store initialisation
const storeGlobal = useGlobalStore();
const postStore = useStorePost();
const artistStore = useStoreArtist();

///
// Ref
///
const filePostPicture = ref(null);
const typePostPicture = ref(null);
const postDescription = ref(null);
const showErrorAlert = ref(false); 
const defaultTextAlert = ref('Vous devez remplir tous les champs présents.');
const newPost = ref(null)

const artistId = artistStore.artistId;

// permet de remettre à false "showErrorAlert" lors de la fermeture de l'erreur d'alerte 
const handleCloseErrorAlert = () => {
    showErrorAlert.value = false;
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
                const post = new Post( null, false , postDescription.value, artistId);
                post.validateDescription(postDescription.value);
                newPost.value = post;
                return true;
            }else{
                // Vérifier si les images sont autorisées
                defaultTextAlert.value = "Les images autorisées sont png, jpg, jpeg";
                showErrorAlert.value = true;
            }
        } else {
                showErrorAlert.value = true;
        }

    } catch (error) {
        if (error.message.includes("Model")) {
            const errorMessageWithoutModel = error.message.replace("Model", "");
            defaultTextAlert.value = errorMessageWithoutModel;
            showErrorAlert.value = true;
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
            data.append('userId', userId);

             /// Asset
            data.append('postPicture',filePostPicture.value);
            for(var pair of data.entries()) {
                console.log(pair[0]+ ', '+ pair[1]); 
            }

            return await postStore.createPost(data);
        } catch (error) {
            storeGlobal.logError(error, 6);
        }
    } else {
        // Sinon, affichez la popup
        showErrorAlert.value = true;
    }
};
</script>