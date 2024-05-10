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
        return await CRUDapi('POST', 'users', data)
    }

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
    };
}

export { userApi };