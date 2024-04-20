<template>

    <div v-if="secondSection">
        <TitleComponent title="Mes catégories" class="text-[3rem] lg:text-[4rem] mt-[3rem]"> </TitleComponent>
        <div class="flex flex-col items-center w-[100vw] pb-[1rem] pt-[2rem] lg:items-start">
            <div class="flex  flex-wrap pb-[1rem] pt-[2rem] w-[90vw] lg:w-[40vw] lg:p-[3rem]">    
                <CategoryTagComponent v-for="(category, index) in categories" :key="index" :textTag="category" ></CategoryTagComponent>
            </div>
        </div>
    </div>

    


</template>

<script setup>
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import CategoryTagComponent from '@/components/toolBox/CategoryTagComponent.vue';




import { categorieStore } from '@/domain/artist/store/CategorieStore.js';
const categoryStore = categorieStore();
const categories = categoryStore.getAllCategoriesName;
console.log(categories);



</script>

