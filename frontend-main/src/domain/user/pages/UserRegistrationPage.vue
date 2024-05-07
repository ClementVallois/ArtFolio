<template>
    <div class="flex flex-col items-center">
    <!-- <TitleComponent title="Je suis un artiste" class="text-[3rem] lg:text-[4rem] mt-[3rem]"> </TitleComponent> -->

    <ul class="steps mt-10 mb-2">
        <li class="step step-secondary">Créer un compte</li>
        <li class="step step-secondary">Compléter son profil </li>
    </ul>

    <p class="font-title text-[2rem] lg:text-[2rem]">ETAPE 2</p>
    <p>Ton compte est créé ! 🎉 Maintenant nous aimerions en savoir plus sur toi...</p>


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
import { ref, computed, onMounted, watch } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';


const username = ref('');
const firstName = ref('');
const lastName = ref('');
const birthDate = ref('');
const showErrorAlert = ref(false); 
const fileUserPicture = ref(null);


onMounted(async () => {
    assignUserRoleIfNeeded()
});


//Assign User Role
const assignUserRoleIfNeeded = () => {
    if (isAuthenticated.value) {
        authenticationService().assignUserRole(user.value.sub, 'User');
    }
};
// Add a watch whenever there is a bit of lag in auth0
watch(isAuthenticated, (newValue) => {
    if (newValue) {
        setTimeout(()=> {
            authenticationService().assignUserRole(user.value.sub, 'User')
        }, 500)
    }
})

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

