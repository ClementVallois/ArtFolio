import { CRUDAuth0API } from "@/domain/auth0/api/CRUDAuth0API";

function userApi() {

    async function getAllUsers() {
        return await CRUDAuth0API('GET', 'users');
    }

    async function getUserById(id) {
        return await CRUDAuth0API('GET', `users/${id}`);
    }

    async function createUser(data) {
        return await CRUDAuth0API('POST', 'users', data)
    }

    async function modifyUser(id, data) {
        return await CRUDAuth0API('PATCH', 'users', id, data)
    }

    async function deleteUser(id) {
        return await CRUDAuth0API('DELETE', 'users', id)
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