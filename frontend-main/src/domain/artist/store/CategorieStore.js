import { defineStore } from 'pinia';
import { ref } from 'vue';
import { categoryService } from '@/domain/artist/service/CategoryService.js';

/////////
///// Categories Store
/////////
export const useCategoryStore = defineStore('categorieStore', () => {
    const allCategoriesData = ref([]);
    const allCategoriesName = ref([]);
    const serviceCategory = categoryService();

    async function getAllCategories() {
        allCategoriesData.value = await serviceCategory.getAllCategories();
    };

    async function getAllCategoriesName() {
        const categories = await serviceCategory.getAllCategories();
        allCategoriesName.value = categories.map(category => category.name);
    };


    return {
        allCategoriesData,
        allCategoriesName,
        getAllCategories,
        getAllCategoriesName
    }
});
