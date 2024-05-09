import { defineStore } from 'pinia';
import { ref } from 'vue'

/////////
///// Global Store
/////////
export const useGlobalStore = defineStore('globalStore', () => {
    // user, artist, none
    const activeRole = ref("none");
    // Role kept in store when registration is ongoing
    const signinRole = ref("");

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

    function modifySigninRole(role) {
        signinRole.value = role
        console.log(signinRole)
    }


    return {
        activeRole,
        signinRole,
        modifySigninRole,
        logError,
        log
    }
});

