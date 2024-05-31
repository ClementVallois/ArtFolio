import { defineStore } from 'pinia';
import { ref, toRaw } from 'vue'
import { profileService } from '@/service/ProfileService.js';

/////////
///// Global Store
/////////
export const useGlobalStore = defineStore('globalStore', () => {
    // user, artist, none
    // On évite utiliser activeRole et on utilise profile.role à la place 
    // const activeRole = ref("none");
    const profile = ref(null)

    let globalLogLevelError = 6;
    let globalLogLevel = 4;


    function logError(data, logLevel) {
        if (logLevel <= globalLogLevelError) {
            console.error(data);
        }
    }
    function log(data, logLevel) {
        if (logLevel <= globalLogLevel) {
            console.error(data);
        }
    }

    async function storeProfileFromAuth0Id(auth0id) {
        try {
            const user = await profileService().getProfileWithAuth0Id(auth0id)
            profile.value = toRaw(user)
        } catch (error) {
            console.log('error in the globalStore', error)
            throw error
        }
    }

    function resetProfile() {
        profile.value=null
    }

    // function storeRole() {
    //     if (profile.value != null) {
    //         activeRole.value = profile.value.role
    //     }
    // }

    // async function storeProfileFromAuth0IdAndRole(auth0id) {
    //     try {
    //         await storeProfileFromAuth0Id(auth0id)
    //         storeRole()
    //     } catch(error) {
    //         throw error
    //     }
    // }

    return {
        profile,
        logError,
        log,
        storeProfileFromAuth0Id,
        resetProfile
    }
});

