<template>
    <div class="flex flex-col items-center">
    <TitleComponent title="Je suis un artiste" class="text-[3rem] lg:text-[4rem] mt-[3rem]"> </TitleComponent>

    <form id="artistForm" @submit.prevent="submitForm"  class="flex flex-col items-center w-[100vw] pb-[1rem] pt-[2rem]">
        <div class="flex flex-col w-[90vw] pb-[1rem]">
            <label for=""> Votre photo de profil</label>
            <input @change="handleFileChange" name="profil_picture"  type="file" required class="file-input file-input-bordered text-[0.8rem]  w-full max-w-xs " />
        </div>
        <div class="flex flex-col w-[90vw] pb-[1rem]">
            <label for=""> Votre nom d'utilisateur</label>
            <input v-model="username" placeholder="john.doe" type="text" required class="input input-bordered w-full max-w-xs" />
        </div>
        <div class="flex flex-col w-[90vw] pb-[1rem]">
            <label for=""> Votre prénom</label>
            <input v-model="firstName" placeholder="John" type="text" required  class="input input-bordered w-full max-w-xs" />
        </div>
            <div class="flex flex-col w-[90vw] pb-[1rem]">
            <label for=""> Votre nom</label>
            <input v-model="lastName" placeholder="Doe" type="text"  required class="input input-bordered w-full max-w-xs" />
        </div>
    
        <div class="flex flex-col w-[90vw] pb-[1rem]">
            <label for=""> Votre date de naissance</label>
            <input v-model="birthDate" type="date" required  class="input input-bordered w-full max-w-xs lg:w-[40%]" />
        </div>

    </form>
    <div class="flex flex justify-between w-[90vw] pb-[1rem]">
        <ButtonComponent type="submit"  textButton="S'inscrire" class="w-[30vw] lg:self-end lg:w-[10vw]" @click="submitForm" ></ButtonComponent>
    </div>
    </div>
    <ErrorAlertComponent v-if="showErrorAlert" @closeErrorAlert="handleCloseErrorAlert" textAlert="Vous devez remplir tous les champs présents."></ErrorAlertComponent>

</template>

<script setup>
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
import ErrorAlertComponent from '@/components/toolBox/ErrorAlertComponent.vue';
import { ref,computed } from 'vue';

const username = ref('');
const firstName = ref('');
const lastName = ref('');
const birthDate = ref('');
const showErrorAlert = ref(false); 
const fileUserPicture = ref(null);

// permet de remettre à false "showErrorAlert" lors de la fermeture de l'erreur d'alerte 
const handleCloseErrorAlert = () => {
    showErrorAlert.value = false;
};

const handleFileChange = (event) => {
    fileUserPicture.value = event.target.files[0].name;
};

// Calcul de la validité du formulaire
const isFormValid = computed(() => {
    // Vérifiez si tous les champs obligatoires sont remplis
    const isFieldsFilled = username.value && firstName.value && lastName.value && birthDate.value && fileUserPicture.value;

    // Retourne vrai si tous les champs sont remplis et au moins une catégorie est sélectionnée
    return isFieldsFilled;
});

// Méthode pour soumettre le formulaire avec validation
const submitForm = () => {
    // Vérifiez si le formulaire est valide
    if (isFormValid.value) {

        const formData = {
                profilePicture: fileUserPicture.value,
                username: username.value,
                firstName: firstName.value,
                lastName: lastName.value,
                birthDate: birthDate.value,
        };
        
        // TODO: Envoyez l'object
        console.log(formData);
    } else {
        // Sinon, affichez la popup
        showErrorAlert.value = true;
    }
};
</script>

