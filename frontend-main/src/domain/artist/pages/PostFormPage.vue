<template>
    <div class="w-[90%] m-auto flex flex-col items-center py-[2rem]">
        <SecondTitleComponent title="Création de votre post" ></SecondTitleComponent>
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
    <ErrorAlertComponent v-if="showErrorAlert" @closeErrorAlert="handleCloseErrorAlert" textAlert="Vous devez remplir tous les champs présents."></ErrorAlertComponent>

</template>

<script setup>
import ErrorAlertComponent from '@/components/toolBox/ErrorAlertComponent.vue';
import SecondTitleComponent from '@/components/toolBox/SecondTitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
import { ref, computed } from 'vue';

const filePostPicture = ref(null);
const postDescription = ref(null);
const showErrorAlert = ref(false); 

// permet de remettre à false "showErrorAlert" lors de la fermeture de l'erreur d'alerte 
const handleCloseErrorAlert = () => {
    showErrorAlert.value = false;
};

const handleFileChange = (event) => {
    filePostPicture.value = event.target.files[0].name;
};

// Calcul de la validité du formulaire
const isFormValid = computed(() => {
    // Vérifiez si tous les champs obligatoires sont remplis
    const isFieldsFilled =  postDescription.value && filePostPicture.value;
    // Retourne vrai si tous les champs sont remplis et au moins une catégorie est sélectionnée
    return isFieldsFilled;
});

// Méthode pour soumettre le formulaire avec validation
const submitForm = () => {
    // Vérifiez si le formulaire est valide
    if (isFormValid.value) {

        const formData = {
                filePostPicture: filePostPicture.value,
                postDescription: postDescription.value,
        };
        
        // TODO: Envoyez l'object
        console.log(formData);
    } else {
        // Sinon, affichez la popup
        showErrorAlert.value = true;
    }
};
</script>