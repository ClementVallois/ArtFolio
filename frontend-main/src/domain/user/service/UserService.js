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
            const response = await apiUser.createUser(data);
            return response;
        } catch (error) {
            storeGlobal.logError("Erreur lors de l'enregistrement d'un utilisateur : " + error.data.message, 6);
            const newError = new Error(error.data.message)
            newError.code = 409 // Conflict 
            throw newError
        }
    }

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
        getUserWithAuth0Id,
    };
}

export { userService };