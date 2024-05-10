import { CRUDapi } from "@/api/CrudApi";


////////////
////////////
// Api call management for users
////////////
////////////
function userApi() {

    ////
    // basique CRUD for users
    ////
    async function createUser(data) {
        return await CRUDapi('POST', 'users', data)
    }

    async function getUserWithAuth0Id(auth0Id) {
        try {
            //TODO : Change with Clement endpoint
            const response = await CRUDapi('GET', `users/auth0id/${auth0Id}`)
            // const response = await CRUDapi('GET', `/users/auth0Id/${auth0Id}`)
            console.log(response)
            return response
        } catch (error) {
            storeGlobal.logError(error, 6);
        }
    }


    return {
        createUser,
        getUserWithAuth0Id,
    };
}

export { userApi };