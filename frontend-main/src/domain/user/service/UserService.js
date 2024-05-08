import { userApi } from '@/domain/user/api/UserRemoteDataSource';
import { useGlobalStore } from '@/store/GlobalStore.js';

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
            storeGlobal.logError("Erreur lors de l'enregistrement d'un utilisateur : " + error.message, 6);
            throw new Error(error.message);
        }
    }


    return {
        createUser
    };
}

export { userService };