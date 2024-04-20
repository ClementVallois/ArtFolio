<template>
    <div v-if="firstSection">
        <TitleComponent title="Je suis un artiste" class="text-[3rem] lg:text-[4rem] mt-[3rem]"> </TitleComponent>

        <form id="artistForm" @submit.prevent="submitForm"  class="flex flex-col items-center w-[100vw] pb-[1rem] pt-[2rem]">
            <div class="flex flex-col w-[90vw] pb-[1rem]">
                <label for=""> Votre photo de profil</label>
                <!-- TODO: v-model ne fonctionne pas sur les types file -->
                <input  name="assetName"  type="file" required class="file-input file-input-bordered text-[0.8rem]  w-full max-w-xs " />
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
        
            <div class="flex flex-col w-[90vw] pb-[1rem]">
                <label for="message" class="block mb-2 text-[1rem] font-medium text-gray-900 ">Description</label>
                <textarea  v-model="profilDescription" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."   class="textarea textarea-bordered h-[20vh] resize-none lg:w-[40%] " ></textarea>   
            </div>
            <div class="flex flex-col w-[90vw] pb-[1rem]">
                <ButtonComponent type="submit"  textButton="Suivant" class="w-[30vw] lg:self-end lg:w-[10vw]" @click="toggleSections"></ButtonComponent>
            </div>
        
        </form>
    
    </div>
    <div v-if="secondSection">
        <TitleComponent title="Mes catégories" class="text-[3rem] lg:text-[4rem] mt-[3rem]"> </TitleComponent>
        <div class="flex flex-col items-center w-[100vw] pb-[1rem] pt-[2rem] lg:items-start">
            <div class="flex  flex-wrap pb-[1rem] pt-[2rem] w-[90vw] lg:w-[40vw] lg:p-[3rem]">    
                <CategoryTagComponent v-for="(category, index) in categories" :key="index" :textTag="category" @categoryClicked="handleCategoryClicked"></CategoryTagComponent>
            </div>
        </div>
    

        <TitleComponent title="Ma publication épinglée" class="text-[3rem] lg:text-[4rem] mt-[3rem]"> </TitleComponent>

        <form class="flex flex-col items-center w-[100vw] pb-[1rem] pt-[2rem]">
            <div class="flex flex-col w-[90vw] pb-[1rem]"> Cette publication sera présente en premier sur votre page.</div>
            <div class="flex flex-col w-[90vw] pb-[1rem]">
                <label class="block mb-2 text-[1rem] font-medium text-gray-900" for="user_avatar">Importer votre photo</label>
                <input type="file" class="file-input file-input-bordered w-[90%] text-[0.8rem] lg:w-[40%]" />
            </div>
    
            <div class="flex flex-col w-[90vw] pb-[1rem]">
                <label for="message" class="block mb-2 text-[1rem] font-medium text-gray-900 ">Description</label>
                <textarea  v-model="postDescription" class="textarea textarea-bordered h-[20vh] w-[90%] resize-none lg:w-[40%] " placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."></textarea>    
            </div>
            <div class="flex flex justify-between w-[90vw] pb-[1rem]">
                <ButtonComponent type="submit"  textButton="Précédent" class="w-[30vw] lg:self-end lg:w-[10vw]" @click="toggleSections"></ButtonComponent>
                <ButtonComponent type="submit"  textButton="S'inscrire" class="w-[30vw] lg:self-end lg:w-[10vw]" @click="submitForm"></ButtonComponent>
            </div>
        
        </form>
    </div>

    
<ErrorAlertComponent v-if="showErrorAlert" @closeErrorAlert="handleCloseErrorAlert" textAlert="Vous devez remplir tous les champs présents."></ErrorAlertComponent>

</template>

<script setup>
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
import CategoryTagComponent from '@/components/toolBox/CategoryTagComponent.vue';
import ErrorAlertComponent from '@/components/toolBox/ErrorAlertComponent.vue';
import { ref } from 'vue';
import { categorieStore } from '@/domain/artist/store/CategorieStore.js';

const categoryStore = categorieStore();

const username = ref('');
const firstName = ref('');
const lastName = ref('');
const birthDate = ref('');
const profilDescription = ref('');
const postDescription = ref('');
const firstSection = ref(true);
const secondSection = ref(false);
const selectedCategories = ref([]);
const showErrorAlert = ref(false); 


// Find categories Array name
const categories = categoryStore.getAllCategoriesName;

// Méthode pour basculer entre les sections 
const toggleSections = () => {
    if (username.value && firstName.value && lastName.value && birthDate.value && profilDescription.value) {
        firstSection.value = !firstSection.value;
        secondSection.value = !secondSection.value;
        showErrorAlert.value = false; 
    } else {
        showErrorAlert.value = true; 
    }
};

// Put in array clicked categories 
const handleCategoryClicked = (category) => {
    if (!selectedCategories.value.includes(category)) {
        selectedCategories.value.push(category);
    } else {
        selectedCategories.value = selectedCategories.value.filter((cat) => cat !== category);
    }
    console.log(selectedCategories.value); 
};

// permet de remettre à false "showErrorAlert" lors de la fermeture de l'erreur d'alerte 
const handleCloseErrorAlert = () => {
    console.log(showErrorAlert.value);
    showErrorAlert.value = false;
};
</script>

