import { defineStore } from 'pinia';
import { allCategories } from '@/domain/artist/api/categoriesDataSource';
import { Optional } from '@/optionnal';
import { ref, computed } from 'vue';


/////////
///// Categories Store
/////////
export const categoriesStore = defineStore('categoriesStore', () => {
    const allCategoriesData = ref(Optional.of(allCategories));

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

