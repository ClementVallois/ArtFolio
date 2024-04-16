import { defineStore } from 'pinia';
import { dataSourceCategories } from '@/domain/artist/api/categoriesDataSource';
import { Optional } from '@/optionnal';
import { ref, computed } from 'vue';


/////////
///// Categories Store
/////////
export const categorieStore = defineStore('categorieStore', () => {
    const allCategoriesData = ref(Optional.of(dataSourceCategories));

    const getAllCategoriesName = computed(() => {
        return !allCategoriesData.value.isEmpty()
            ? allCategoriesData.value.get().map(category => category.name)
            : [];
    });

    function setCategories(categories) {
        allCategoriesData.value = Optional.of(categories);
    }

    return {
        allCategoriesData,
        getAllCategoriesName,
        setCategories
    }
});

