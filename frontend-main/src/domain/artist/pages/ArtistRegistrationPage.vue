<template>
    <div v-if="firstSection"  class="flex flex-col items-center">
        <ul class="steps mt-10 mb-2">
            <li class="step step-secondary">Créer un compte</li>
            <!-- <li class="step step-secondary">Se connecter</li> -->
            <li class="step step-secondary">Compléter son profil </li>
            <li class="step">Epingle ton post</li>
        </ul>

        <p class="font-title text-[2rem] lg:text-[2rem]">ETAPE 2</p>
        <p>Ton compte est créé ! 🎉 Maintenant nous aimerions en savoir plus sur toi...</p>

        <form id="artistForm" @submit.prevent="submitForm"  class="flex flex-col items-center w-[100vw] pb-[1rem] pt-[2rem]"  method="post"  enctype="multipart/form-data">
            <div class="flex flex-col w-[90vw] pb-[1rem]">
                <label for=""> Votre photo de profil</label>
                <input @change="handleProfilPictureFileChange"  name="assetName"  type="file" required class="file-input file-input-bordered text-[0.8rem]  w-full max-w-xs " />
            </div>
            <!-- Voir pour l'unicité du username -->
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
        
            <div class="flex flex-col w-[90vw] pb-[1rem]">
                <label for="message" class="block mb-2 text-[1rem] font-medium text-gray-900 ">Description</label>
                <textarea  v-model="profilDescription" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."   class="textarea textarea-bordered h-[20vh] resize-none lg:w-[40%] " ></textarea>   
            </div>    
        </form>
        <div class="flex flex-col w-[90vw] pb-[1rem]">
            <ButtonComponent type="submit"  textButton="Suivant" class="w-[30vw] lg:self-end lg:w-[10vw]" @click="toggleSections"></ButtonComponent>
        </div>
    </div>
    <div v-if="secondSection" class="flex flex-col items-center">
        
        <ul class="steps mt-10 mb-2">
            <li class="step step-secondary">Créer un compte</li>
            <li class="step step-secondary">Compléter son profil </li>
            <li class="step step-secondary">Epingle ton post</li>
        </ul>

        <p class="font-title text-[2rem] lg:text-[2rem]">ETAPE 3</p>
        <p>Bientôt terminé ! 💪 Publie ton premier post pour gagner en visibilité</p>
        
        <TitleComponent title="Mes catégories" class="text-[3rem] lg:text-[4rem] mt-[3rem]"> </TitleComponent>
        <div class="flex flex-col items-center w-[100vw] pb-[1rem] pt-[2rem] lg:items-start">
            <div class="flex  flex-wrap pb-[1rem] pt-[2rem] w-[90vw] lg:w-[55vw] lg:p-[3rem]">    
                <CategoryTagComponent v-for="(category, index) in categoryStore.allCategoriesData" :key="index" :textTag="category.name" :categoryId="category.id"  @categoryClicked="handleCategoryClicked"></CategoryTagComponent>
            </div>
        </div>
    

        <TitleComponent title="Ma publication épinglée" class="text-[3rem] lg:text-[4rem] mt-[3rem]"> </TitleComponent>

        <form class="flex flex-col items-center w-[100vw] pb-[1rem] pt-[2rem]">
            <div class="flex flex-col w-[90vw] pb-[1rem]"> Cette publication sera présente en premier sur votre page.</div>
            <div class="flex flex-col w-[90vw] pb-[1rem]">
                <label class="block mb-2 text-[1rem] font-medium text-gray-900" for="user_avatar">Importer votre photo</label>
                <input @change="handlePostPictureFileChange"   type="file" class="file-input file-input-bordered w-[90%] text-[0.8rem] lg:w-[40%]" />
            </div>
    
            <div class="flex flex-col w-[90vw] pb-[1rem]">
                <label for="message" class="block mb-2 text-[1rem] font-medium text-gray-900 ">Description</label>
                <textarea  v-model="postDescription" class="textarea textarea-bordered h-[20vh] w-[90%] resize-none lg:w-[40%] " placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."></textarea>    
            </div>
        
        </form>
        <div class="flex flex justify-between w-[90vw] pb-[1rem]">
            <ButtonComponent type="submit"  textButton="Précédent" class="w-[30vw] lg:self-end lg:w-[10vw]" @click="toggleSections"></ButtonComponent>
            <ButtonComponent type="submit"  textButton="S'inscrire" class="w-[30vw] lg:self-end lg:w-[10vw]" @click="submitForm" ></ButtonComponent>
        </div>
    </div>

    
    <AlertComponent v-if="showAlert" v-model:alertError="alertError" @closeAlert="handleCloseAlert" v-model:textAlert="defaultTextAlert"></AlertComponent>

</template>

<script setup>
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
import CategoryTagComponent from '@/components/toolBox/CategoryTagComponent.vue';
import AlertComponent from '@/components/toolBox/AlertComponent.vue';
import { User } from '@/model/UserModel';
import { Post } from '@/domain/artist/model/PostModel.js';
import { ref,computed, toRaw, onMounted, watch } from 'vue';
import { useCategoryStore } from '@/domain/artist/store/CategorieStore.js';
import { useStoreArtist } from '@/domain/artist/store/ArtistStore';
import { authenticationService } from '@/domain/authentification/services/AuthenticationService.js';
import { Asset } from '@/model/AssetModel.js';
import { useAuth0 } from '@auth0/auth0-vue';
import { useGlobalStore } from '@/store/GlobalStore.js';
import { useRouter } from 'vue-router';
const { error, isAuthenticated, isLoading, user} = useAuth0();// Store initialisation



//get id auth0
const artistStore = useStoreArtist();
const categoryStore = useCategoryStore();
const storeGlobal = useGlobalStore();
const router = useRouter();
///
// Ref
///
// Global
const firstSection = ref(true);
const secondSection = ref(false);
const showAlert = ref(false); 
const alertError = ref(true);
const defaultTextAlert = ref('Vous devez remplir tous les champs présents.');

// Artist
const username = ref('');
const firstName = ref('');
const lastName = ref('');
const birthDate = ref('');
const profilDescription = ref('');
const newUser = ref(null);

//Asset
const filePostPicture = ref(null);
const typePostPicture = ref(null);
const fileUserPicture = ref(null);
const typeUserPicture = ref(null);

// Post
const postDescription = ref('');
const newPost = ref(null);

// Category
const selectedCategories = ref([]);


////
// Global
//// 
// permet de remettre à false "showErrorAlert" lors de la fermeture de l'erreur d'alerte 
const handleCloseAlert = () => {
    showAlert.value = false;
};




////
// Category
////
onMounted(async () => {
    assignUserRoleIfNeeded()
    await categoryStore.getAllCategories();
});

//Assign Artist Role
const assignUserRoleIfNeeded = () => {
    if (isAuthenticated.value) {
        authenticationService().assignUserRole(user.value.sub, 'Artist');
    }
};
// Add a watch whenever there is a bit of lag in auth0
watch(isAuthenticated, (newValue) => {
    if (newValue) {
        setTimeout(()=> {
            authenticationService().assignUserRole(user.value.sub, 'Artist')
        }, 500)
    }
})

// Put in array clicked categories 
const handleCategoryClicked = (category) => {
    if (!selectedCategories.value.includes(category)) {
        selectedCategories.value.push(category);
    } else {
        selectedCategories.value = selectedCategories.value.filter((cat) => cat !== category);
    }
};


////
// Asset
//
// permet de récupérer le nom et le type de la photo de profil
const handleProfilPictureFileChange = (event) => {
    fileUserPicture.value = event.target.files[0];
    typeUserPicture.value = event.target.files[0].type;
};
// permet de récupérer le nom et le type de la photo deu post epinglé
const handlePostPictureFileChange = (event) => {
    filePostPicture.value = event.target.files[0];
    typePostPicture.value = event.target.files[0].type;
};


/////
// Méthode pour basculer entre les sections et vérifier les champs de la première partie du formulaire
/////
const toggleSections = () => {
    try {
        if (fileUserPicture.value && username.value && firstName.value && lastName.value && birthDate.value && profilDescription.value) {
            if (fileUserPicture.value && (typeUserPicture.value === "image/png" || typeUserPicture.value === "image/jpg" || typeUserPicture.value === "image/jpeg")) {
            const userInstance = new User(null, firstName.value, lastName.value, birthDate.value, username.value, profilDescription.value ,"active", "artist", user.value.sub);
            userInstance.validateUsername(username.value);  
            userInstance.validateName(firstName.value, 'prénom');
            userInstance.validateName(lastName.value, 'nom'); 
            userInstance.validateBirthDate(birthDate.value);
            userInstance.validateDescription(profilDescription.value);
            firstSection.value = !firstSection.value;         
            secondSection.value = !secondSection.value;
            alertError.value = true;
            showAlert.value = false; 
            newUser.value = userInstance;
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
        storeGlobal.logError(error, 6);
    }
};




/////
// Calcul de la validité du formulaire
/////
const isFormValid = computed(() => {
    try {
        if (selectedCategories.value && filePostPicture.value && postDescription.value) {
            const post = new Post( null, true , postDescription.value);
            if (selectedCategories.value.length > 0) {
                if (filePostPicture.value && (typePostPicture.value == "image/png" || typePostPicture.value == "image/jpg" || typePostPicture.value == "image/jpeg")) {
                    post.validateDescription(postDescription.value)
                    newPost.value = post;
                    return true;
                }else{
                    defaultTextAlert.value = "Les images autorisées sont png, jpg, jpeg";
                    alertError.value = true;
                    showAlert.value = true; 
                }
            }else{
                defaultTextAlert.value = "Vous devez sélectionner au moins une catégories";
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
            // TODO: mettre le vrai auth0id
            /// Artist
            const { firstName, lastName, birthDate, username, description: userDescription, status, role, auth0Id } = toRaw(newUser.value);
            data.append('firstName', firstName);
            data.append('lastName', lastName);
            data.append('birthDate', birthDate);
            data.append('username', username);
            data.append('description', userDescription);
            data.append('status', status);
            data.append('role', role);
            data.append('auth0Id', auth0Id)

            /// Post 
            const { isPinned, description: postDescription} = toRaw(newPost.value);
            data.append('post[isPinned]', isPinned);
            data.append('post[description]', postDescription);
    

            /// Category
            const categories = toRaw(selectedCategories.value);
            categories.forEach(categoryId => {
                data.append('category[categories][]', categoryId);
            });

            /// Asset
            data.append('postPicture',filePostPicture.value);
            data.append('profilePicture',fileUserPicture.value);

            let response =  await artistStore.createArtist(data);
            if (response.status == 201 ) {
                await storeGlobal.storeProfileFromAuth0Id(user.value.sub)
                router.push({ name: 'ArtistInfoPage' });
            }else{
                defaultTextAlert.value = "Une erreur c'est produite au moment de la création.";
                alertError.value = true;
                showAlert.value = true; 
            }
        } catch (error) {
            if (error.message.includes("username") && error.message.includes("already exists")) {
                defaultTextAlert.value = "Le nom d'utilisateur que vous avez choisi existe déjà !";
                alertError.value = true;
                showAlert.value = true;
            }
            storeGlobal.logError(error, 6);
        }
    } else {
        // Sinon, affichez la popup
        alertError.value = true;
        showAlert.value = true;
    }
};
</script>

