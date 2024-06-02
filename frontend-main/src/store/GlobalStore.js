import { defineStore } from 'pinia';
import { ref } from 'vue'

/////////
///// Global Store
/////////
export const useGlobalStore = defineStore('globalStore', () => {

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


    return {
        logError,
        log
    }
});

