import { Category } from '@/domain/artist/model/CategoryModel';
import { categoryApi } from '@/domain/artist/api/CategoryRemoteDataSource';
import { useGlobalStore } from '@/store/GlobalStore.js';


function categoryService() {
    const storeGlobal = useGlobalStore();
    const apiCategory = categoryApi();

    ////
    // basique CRUD for artists
    ////
    async function getAllCategories() {
        try {
            const { data } = await apiCategory.getAllCategories();
            if (Array.isArray(data)) {
                return data.map(jsonCategory => Category.fromJson(jsonCategory));
            } else {
                storeGlobal.logError("La réponse n'est pas un tableau d'objets JSON : " + data, 6);
                return [];
            }
        } catch (error) {
            storeGlobal.logError("Erreur lors de la récupération des categories: " + error, 6);
        }
    };

    async function getCategoryById(id) {
        try {
            const { data } = await apiCategory.getCategoryById(id);
            return Category.fromJson(data);
        } catch (error) {
            storeGlobal.logError("Erreur lors de la récupération d'une catégorie: " + error, 6);
        }
    };


    return {
        getAllCategories,
        getCategoryById,
    };
}

export { categoryService };