import { amateurApi } from '@/domain/amateur/api/AmateurRemoteDataSource';
import { useGlobalStore } from '@/store/GlobalStore.js';
import { User } from '@/model/UserModel';

function amateurService() {
    const storeGlobal = useGlobalStore();
    const apiAmateur = amateurApi();

    ////
    // basique CRUD for amateur
    ////
    async function createAmateur(data) {
        try {
            return apiAmateur.createAmateur(data);
        } catch (error) {
            storeGlobal.logError("Erreur lors de l'enregistrement d'un amateur : " + error.message, 6);
            const newError = new Error(error.message)
            newError.code = 409 // Conflict 
            throw newError
        }
    }


    return {
        createAmateur,
    };
}

export { amateurService };