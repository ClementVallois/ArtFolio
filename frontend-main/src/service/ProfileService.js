import { profileApi } from '@/api/ProfileRemoteDataSource';
import { useGlobalStore } from '@/store/GlobalStore.js';
import { User } from '@/model/UserModel';

function profileService() {
    const storeGlobal = useGlobalStore();

    async function getProfileWithAuth0Id(auth0Id) {
        try {
            const response = await profileApi().getProfileWithAuth0Id(auth0Id);   
            console.log('auth0id', auth0Id)
            console.log('response(profileApi().getProfileWithAuth0Id(auth0Id)', response)
            console.log('User.fromJson(response.data', User.fromJson(response.data))
            return User.fromJson(response.data)         
        } catch (error) {
            storeGlobal.logError("Erreur lors de la récupération des artistes: " + error, 6);
            throw error
        }
    }

    return {
        getProfileWithAuth0Id,
    };
}

export { profileService };