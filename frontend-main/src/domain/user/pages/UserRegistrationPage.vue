<template>
    <div class="flex flex-col items-center">
    <TitleComponent title="Je suis un utilisateur" class="text-[3rem] lg:text-[4rem] mt-[3rem]"> </TitleComponent>

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
    <ErrorAlertComponent v-if="showErrorAlert" @closeErrorAlert="handleCloseErrorAlert" v-model:textAlert="defaultTextAlert"></ErrorAlertComponent>

</template>

<script setup>
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
import ErrorAlertComponent from '@/components/toolBox/ErrorAlertComponent.vue';
import { User } from '@/model/UserModel';
import { useGlobalStore } from '@/store/GlobalStore.js';
import { useStoreUser } from '@/domain/user/store/UserStore';
import { ref, computed, toRaw } from 'vue';


// Store initialisation
const storeGlobal = useGlobalStore();
const userStore = useStoreUser();



///
// Ref
///
// Global
const showErrorAlert = ref(false); 
const defaultTextAlert = ref('Vous devez remplir tous les champs présents.');

// User
const newUser = ref(null);
const username = ref('');
const firstName = ref('');
const lastName = ref('');
const birthDate = ref('');

//Asset
const fileUserPicture = ref(null);
const typeUserPicture = ref(null);




////
// Global
//// 
// permet de remettre à false "showErrorAlert" lors de la fermeture de l'erreur d'alerte 
const handleCloseErrorAlert = () => {
    showErrorAlert.value = false;
};

////
// Asset
//
const handleFileChange = (event) => {
    fileUserPicture.value = event.target.files[0];
    typeUserPicture.value = event.target.files[0].type;
};


/////
// Calcul de la validité du formulaire
/////
const isFormValid = computed(() => {
    try {
        if (fileUserPicture.value && username.value && firstName.value && lastName.value && birthDate.value) {
            if (fileUserPicture.value && (typeUserPicture.value === "image/png" || typeUserPicture.value === "image/jpg" || typeUserPicture.value === "image/jpeg")) {
                const user = new User(null, firstName.value, lastName.value, birthDate.value, username.value, null,"active", "user", "Jbbgzel-nkedfneznk-ezgze");
                user.validateUsername(username.value);  
                user.validateName(firstName.value, 'prénom');
                console.log(lastName.value);
                user.validateName(lastName.value, 'nom'); 
                user.validateBirthDate(birthDate.value);
                newUser.value = user;
                return true;
            }else{  
                defaultTextAlert.value = "Les images autorisées sont png, jpg, jpeg";
                showErrorAlert.value = true;
            }
        }else{
            showErrorAlert.value = true;
        }
    } catch (error) {
        if (error.message.includes("Model")) {
            const errorMessageWithoutModel = error.message.replace("Model", "");
            defaultTextAlert.value = errorMessageWithoutModel;
            showErrorAlert.value = true;
        }
        storeGlobal.logError(error, 6);
    }
});

/////
// Méthode pour soumettre le formulaire avec validation
/////
const submitForm = async () => {
    // Vérifiez si le formulaire est valide
    if (isFormValid.value) {
        try {
            let data = new FormData();
            // User
            const { firstName, lastName, birthDate, username, status, role, auth0Id } = toRaw(newUser.value);
            const randomString = Math.random().toString(36).substring(2, 12);
            data.append('firstName', firstName);
            data.append('lastName', lastName);
            data.append('birthDate', birthDate);
            data.append('username', username);
            data.append('status', status);
            data.append('role', role);
            data.append('auth0Id', randomString)

            /// Asset
            data.append('profilePicture',fileUserPicture.value);

            return await userStore.createUser(data);

        } catch (error) {
            if (error.message.includes("username") && error.message.includes("already exists")) {
                defaultTextAlert.value = "Le nom d'utilisateur que vous avez choisi existe déjà !";
                showErrorAlert.value = true;
            }
            storeGlobal.logError(error, 6);
        }
    } else {
        // Sinon, affichez la popup
        showErrorAlert.value = true;
    }
};
</script>
