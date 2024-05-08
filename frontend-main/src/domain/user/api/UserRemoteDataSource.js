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


    return {
        createUser
    };
}

export { userApi };