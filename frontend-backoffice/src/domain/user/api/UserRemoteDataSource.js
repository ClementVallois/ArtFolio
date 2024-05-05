import { CRUDapi } from "@/api/CrudApi.js";

function userApi() {

    async function getAllUsers() {
        console.log('starting the call to CRUDapi')
        return await CRUDapi('GET', 'users');
    }

    async function getUserById(id) {
        return await CRUDapi('GET', `users/${id}`);
    }

    async function createUser(data) {
        return await CRUDapi('POST', 'users', data)
    }

    async function modifyUser(id, data) {
        return await CRUDapi('PATCH', 'users', id, data)
    }

    async function deleteUser(id) {
        return await CRUDapi('DELETE', 'users', id)
    }


    return {
        getAllUsers,
        getUserById,
        createUser,
        modifyUser,
        deleteUser,
    };
}

export { userApi };