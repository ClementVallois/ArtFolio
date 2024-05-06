import { Category } from '@/domain/artist/model/CategoryModel';
import { categoryApi } from '@/domain/artist/api/CategoryRemoteDataSource';



function categoryService() {
    ////
    // basique CRUD for artists
    ////
    async function getAllCategories() {
        // const categoryApi = await categoryApi();
        try {
            const response = await categoryApi().getAllCategories();
            if (Array.isArray(response)) {
                return response.map(jsonCategory => Category.fromJson(jsonCategory));
            } else {
                console.error("La réponse n'est pas un tableau d'objets JSON :", response);
                return [];
            }
        } catch (error) {
            console.log(error);
            console.error("Erreur lors de la récupération des categories:", error);
        }
    };

    async function getCategoryById(id) {
        try {
            const response = await categoryApi.getCategoryById(id);
            return Category.fromJson(response);
        } catch (error) {
            console.log(error);
            console.error("Erreur lors de la récupération d'une catégorie' :", error);
        }
    };




    return {
        getAllCategories,
        getCategoryById,
    };
}

export { categoryService };