<template>
    <div v-if="firstSection"  class="flex flex-col items-center">
        <!-- <TitleComponent title="Je suis un artiste" class="text-[3rem] lg:text-[4rem] mt-[3rem]"> </TitleComponent> -->

        <ul class="steps mt-10 mb-2">
            <li class="step step-secondary">Créer un compte</li>
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
                <CategoryTagComponent v-for="(category, index) in categories" :key="index" :textTag="category.name" :categoryId="category.id"  @categoryClicked="handleCategoryClicked"></CategoryTagComponent>
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

    
<ErrorAlertComponent v-if="showErrorAlert" @closeErrorAlert="handleCloseErrorAlert" v-model:textAlert="defaultTextAlert"></ErrorAlertComponent>

</template>

<script setup>
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
import CategoryTagComponent from '@/components/toolBox/CategoryTagComponent.vue';
import ErrorAlertComponent from '@/components/toolBox/ErrorAlertComponent.vue';
import { User } from '@/model/UserModel';
import { Post } from '@/domain/artist/model/PostModel.js';
import { ref,computed, toRaw, onMounted, onMounted } from 'vue';
import { useCategoryStore } from '@/domain/artist/store/CategorieStore.js';
import { authenticationService } from '@/domain/authentification/services/AuthenticationService.js'
import { Asset } from '@/model/AssetModel';




const fileUserPicture = ref(null);
const typeUserPicture = ref(null);
const username = ref('');
const firstName = ref('');
const lastName = ref('');
const birthDate = ref('');
const profilDescription = ref('');
const filePostPicture = ref(null);
const typePostPicture = ref(null);
const postDescription = ref('');
const firstSection = ref(true);
const secondSection = ref(false);
const selectedCategories = ref([]);
const showErrorAlert = ref(false); 
const defaultTextAlert = ref('Vous devez remplir tous les champs présents.');
const newUser = ref(null);
const newPost = ref(null);
const assetPost = ref(null);
const assetProfile = ref(null);
const categories = ref(null);
// Regex
const descriptionRegex =  /^[a-zA-Z0-9._\-() "&,;:/]+$/;


// Find categories Array name
const categoryStore = useCategoryStore();
onMounted(async () => {
    await categoryStore.getAllCategories();
    categories.value = categoryStore.allCategoriesData;
});



// Put in array clicked categories 
const handleCategoryClicked = (category) => {
    if (!selectedCategories.value.includes(category)) {
        selectedCategories.value.push(category);
    } else {
        selectedCategories.value = selectedCategories.value.filter((cat) => cat !== category);
    }
};

// permet de remettre à false "showErrorAlert" lors de la fermeture de l'erreur d'alerte 
const handleCloseErrorAlert = () => {
    showErrorAlert.value = false;
};

// permet de récupérer le nom et le type de la photo de profil
const handleProfilPictureFileChange = (event) => {
    console.log(event.target.files[0]);
    fileUserPicture.value = event.target.files[0].name;
    typeUserPicture.value = event.target.files[0].type;
};

// permet de récupérer le nom et le type de la photo deu post epinglé
const handlePostPictureFileChange = (event) => {
    filePostPicture.value = event.target.files[0].name;
    typePostPicture.value = event.target.files[0].type;
};



const isValueValid = (value, regex) => {
    return regex.test(value);
};


/////
// Méthode pour basculer entre les sections 
/////
const toggleSections = () => {
    try {
        
        if (fileUserPicture.value && (typeUserPicture.value === "image/png" || typeUserPicture.value === "image/jpg" || typeUserPicture.value === "image/jpeg")) {
            const user = new User(null, firstName.value, lastName.value, birthDate.value, username.value, profilDescription.value ,"actif", "artist");
            const asset = new Asset( null, null, "profil_picture", null)
            user.validateUsername(username.value);  
            user.validateName(firstName.value, 'prénom');
            user.validateName(lastName.value, 'nom'); 
            user.validateBirthDate(birthDate.value);
            user.validateDescription(profilDescription.value);
            firstSection.value = !firstSection.value;         
            secondSection.value = !secondSection.value;
            showErrorAlert.value = false; 
            newUser.value = user;
            assetProfile.value = asset;

        } else {
            // Vérifier si les images sont autorisées
            defaultTextAlert.value = "Les images autorisées sont png, jpg, jpeg";
            showErrorAlert.value = true;
        }
    } catch (error) {
        // Gérer les erreurs de validation
        defaultTextAlert.value = error.message;
        showErrorAlert.value = true;
    }
};




/////
// Calcul de la validité du formulaire
/////
const isFormValid = computed(() => {
    try {
        const post = new Post( null, true , postDescription.value);
        const asset = new Asset( null, null, "post_picture", null);
        if (selectedCategories.value.length > 0) {
        if (filePostPicture.value && (typePostPicture.value == "image/png" || typePostPicture.value == "image/jpg" || typePostPicture.value == "image/jpeg")) {
            post.validateDescription(postDescription.value)
            if (fileUserPicture.value && typeUserPicture.value && username.value && firstName.value && lastName.value && birthDate.value && profilDescription.value) {
                    newPost.value = post;
                    assetPost.value = asset;
                    return true;
            }
        }else{
            defaultTextAlert.value = "Les images autorisées sont png, jpg, jpeg"
            showErrorAlert.value = true; 
        }
    }else{
        defaultTextAlert.value = "Vous devez sélectionner au moins une catégories";
        showErrorAlert.value = true; 
    }
    } catch (error) {
        // Gérer les erreurs de validation
        defaultTextAlert.value = error.message;
        showErrorAlert.value = true;
    }
});




/////
// Méthode pour soumettre le formulaire avec validation
/////
const submitForm = () => {
    // Vérifiez si le formulaire est valide
    if (isFormValid.value) {

        const formData = {
            artist: toRaw(newUser.value),
            post: toRaw(newPost.value),
            category: toRaw(selectedCategories.value),
            asset : {
                assetProfile : toRaw(assetProfile.value),
                assetPost : toRaw(assetPost.value)
            }
        };
        
        // TODO: Envoyez l'object
        console.log(formData);
    } else {
        // Sinon, affichez la popup
        showErrorAlert.value = true;
    }
};
</script>

