import { profileApi } from '@/api/ProfileRemoteDataSource';
import { useGlobalStore } from '@/store/GlobalStore.js';
import { authenticationService } from '@/domain/authentification/services/AuthenticationService'
import { User } from '@/model/UserModel';

function profileService() {
    const storeGlobal = useGlobalStore();

    async function getProfileWithAuth0Id(auth0Id) {
        try {
            const response = await profileApi().getProfileWithAuth0Id(auth0Id);   
            return User.fromJson(response.data)         
        } catch (error) {
            storeGlobal.logError("Erreur lors de la récupération des artistes: " + error, 6);
            throw error
        }
    }

    async function deleteProfile(typeUser, id, auth0id) {
        return new Promise(async (resolve, reject) => {
            try {
                if(typeUser == 'artist'){
                    await profileApi().deleteProfileArtist(id)
                }else {

                }
                await authenticationService().deleteUser(auth0id)
                resolve({ status : '200', message: 'success' })
            } catch (error) {
                reject(error)
            }
        })
        
    }

    return {
        getProfileWithAuth0Id,
        deleteProfile
    };
}

export { profileService };