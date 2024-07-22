import { CRUDapi } from "@/api/CrudApi";
import { useGlobalStore } from "@/store/GlobalStore";


////////////
////////////
// Api call management for users
////////////
////////////
function userApi() {

    const storeGlobal = useGlobalStore();
    ////
    // basique CRUD for users
    ////
    async function createUser(data) {
        return CRUDapi('POST', 'users', data)
    }

    async function getUserById(id) {
        return CRUDapi('GET', `users/${id}`);
    }

    async function deleteUser(id) {
        return CRUDapi('DELETE', `users/${id}`)
    }

    async function modifyUser(id, data) {
        return CRUDapi('PATCH', `users/${id}`, data)
    }

    async function getUserProfilePicture(id) {
        return CRUDapi('GET', `users/${id}/assets`)
    }



    ////
    // Auth0
    ////
    async function getUserWithAuth0Id(auth0Id) {
        try {
            const response = await CRUDapi('GET', `users/auth0Id/${auth0Id}`)
            return response
        } catch (error) {
            storeGlobal.logError(error, 6);
            return error
        }
    }


    return {
        createUser,
        getUserWithAuth0Id,
        getUserById,
        deleteUser,
        modifyUser,
        getUserProfilePicture,
    };
}

export { userApi };