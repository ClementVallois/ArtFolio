import { defineStore } from 'pinia';
import { ref } from 'vue';
import { categoryService } from '@/domain/artist/service/CategoryService.js';

/////////
///// Categories Store
/////////
export const useCategoryStore = defineStore('categorieStore', () => {
    const allCategoriesData = ref([]);
    const allCategoriesName = ref([]);

    async function getAllCategories() {
        allCategoriesData.value = await categoryService().getAllCategories();
    };

    async function getAllCategoriesName() {
        const categories = await categoryService().getAllCategories();
        allCategoriesName.value = categories.map(category => category.name);
    };


    return {
        allCategoriesData,
        allCategoriesName,
        getAllCategories,
        getAllCategoriesName
    }
});
