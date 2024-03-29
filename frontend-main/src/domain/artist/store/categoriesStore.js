import { defineStore } from 'pinia';
import { allCategories } from '@/domain/artist/api/categoriesDataSource';
import { Optional } from '@/optionnal';

/////////
///// Categories Store
/////////
export const categoriesStore = defineStore('categoriesStore', () => {
    const allCategoriesData = Optional.of(allCategories);

    // retrieves the name of all categories
    function getAllCategoriesName() {
        if (!allCategoriesData.isEmpty()) {
            return allCategoriesData.get().map(category => category.name);
        }
        return [];
    }


    return { getAllCategoriesName };
});

