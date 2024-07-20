import { userApi } from '@/domain/user/api/UserRemoteDataSource';
import { useGlobalStore } from '@/store/GlobalStore.js';
import { User } from '@/model/UserModel';

function userService() {
    const storeGlobal = useGlobalStore();
    const apiUser = userApi();

    ////
    // basique CRUD for user
    ////
    async function createUser(data) {
        try {
            return apiUser.createUser(data);
        } catch (error) {
            storeGlobal.logError("Erreur lors de l'enregistrement d'un amateur : " + error.data.message, 6);
            const newError = new Error(error.data.message)
            newError.code = 409 // Conflict 
            throw newError
        }
    }

    async function getUserById(id) {
        try {
            const response = await apiUser.getUserById(id);
            return User.fromJson(response);
        } catch (error) {
            storeGlobal.logError("Erreur lors de la récupération d'un amateur :" + error, 6);
        }
    };

    async function modifyUser(id, data) {
        try {
            return apiUser.modifyUser(id, data);
        } catch (error) {
            storeGlobal.logError("Erreur lors de la modification des informations d'un amateur: " + error.message, 6);
            throw new Error(error.message);
        }
    }

    async function deleteUser(id) {
        try {
            return apiUser.deleteUser(id);
        } catch (error) {
            storeGlobal.logError("Erreur lors de la suppression d'un amateur : " + error.message, 6);
            throw new Error(error.message);
        }
    }


    ////
    // Auth0
    ////
    async function getUserWithAuth0Id(auth0Id) {
        try {
            const response = await apiUser.getUserWithAuth0Id(auth0Id);
            console.log('response from userService', response)
            return User.fromJson(response)
        } catch (error) {
            console.log('erreur niveau Remote DataSource')
            storeGlobal.logError("Erreur lors de la récupération des artistes: " + error, 6);
            return error
        }
    }


    return {
        createUser,
        getUserById,
        modifyUser,
        getUserWithAuth0Id,
        deleteUser,
    };
}

export { userService };