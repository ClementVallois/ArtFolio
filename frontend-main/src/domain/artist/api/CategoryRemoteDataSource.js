import { CRUDapi } from "@/api/CrudApi";

////////////
////////////
// Api call management for categories
////////////
////////////
function categoryApi() {

    ////
    // basique CRUD for categories
    ////

    function getAllCategories() { // Comme c'est async, le type de retour est Promise<TYPE DE LA VARIABLE QUE TU RENVOIES> 
        return CRUDapi('GET', 'categories');
    }

    function getCategoryById(id) {
        return CRUDapi('GET', `categories/${id}`);
    }

    return {
        getAllCategories,
        getCategoryById,
    };
}

export { categoryApi };




