import { defineStore } from 'pinia';
import { ref } from 'vue';
import { categoryService } from '@/domain/artist/service/CategoryService.js';

/////////
///// Categories Store
/////////
export const useCategoryStore = defineStore('categorieStore', () => {
    const allCategoriesDatas = ref([]);
    const allCategoriesName = ref([]);

    async function getAllCategories() {
        allCategoriesDatas.value = await categoryService().getAllCategories();
    };

    async function getAllCategoriesName() {
        const categories = await categoryService().getAllCategories();
        allCategoriesName.value = categories.map(category => category.name);
    };


    return {
        allCategoriesDatas,
        allCategoriesName,
        getAllCategories,
        getAllCategoriesName
    }
});
