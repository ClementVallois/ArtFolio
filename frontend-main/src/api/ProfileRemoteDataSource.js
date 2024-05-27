import { CRUDapi } from "@/api/CrudApi";
import { useGlobalStore } from "@/store/GlobalStore";

function profileApi() {

    const globalStore = useGlobalStore();

    async function getProfileWithAuth0Id(auth0Id) {
        try {
            const response = await CRUDapi('GET', `users/auth0Id/${auth0Id}`)
            return response
        } catch (error) {
            console.log('erreur niveau Remote DataSource')
            globalStore.logError(error, 6);
            throw error
        }
    }


    return {
        getProfileWithAuth0Id,
    };
}

export { profileApi };