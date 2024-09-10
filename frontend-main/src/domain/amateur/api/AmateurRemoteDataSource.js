import { CRUDapi } from "@/api/CrudApi";

////////////
////////////
// Api call management for amateur
////////////
////////////
function amateurApi() {

    ////
    // basique CRUD for amateur
    ////

    async function getAllAmateurs() {
        return CRUDapi('GET', 'amateurs');
    }

    async function getAmateurById(id) {
        return CRUDapi('GET', `amateurs/${id}`);
    }

    async function createAmateur(data) {
        return CRUDapi('POST', 'amateurs', data)
    }

    async function modifyAmateur(id, data) {
        return CRUDapi('PATCH', `amateurs/${id}`, data)
    }

    async function deleteAmateur(id) {
        return CRUDapi('DELETE', `amateurs/${id}`)
    }


    return {
        getAllAmateurs,
        getAmateurById,
        createAmateur,
        modifyAmateur,
        deleteAmateur,
    };
}

export { amateurApi };




