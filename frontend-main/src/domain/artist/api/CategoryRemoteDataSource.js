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

    async function getAllCategories() {
        return CRUDapi('GET', 'categories');
    }

    async function getCategoryById(id) {
        return CRUDapi('GET', `categories/${id}`);
    }

    return {
        getAllCategories,
        getCategoryById,
    };
}

export { categoryApi };




