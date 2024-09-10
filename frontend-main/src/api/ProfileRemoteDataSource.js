import { CRUDapi } from "@/api/CrudApi";
import { useGlobalStore } from "@/store/GlobalStore";

function profileApi() {

    const globalStore = useGlobalStore();

    async function getProfileWithAuth0Id(auth0Id) {
        try {
            const response = await CRUDapi('GET', `users/auth0Id/${auth0Id}`)
            return response
        } catch (error) {
            globalStore.logError(error, 6);
            throw error
        }
    }

    async function deleteProfileArtist(id) {
        return CRUDapi('DELETE', `artists/me/${id}`)
    }

    async function deleteProfileAmateur(id) {
        return CRUDapi('DELETE', `amateurs/me/${id}`)
    }


    return {
        getProfileWithAuth0Id,
        deleteProfileArtist,
        deleteProfileAmateur,
    };
}

export { profileApi };