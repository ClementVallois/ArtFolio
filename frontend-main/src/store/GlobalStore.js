import { defineStore } from 'pinia';

/////////
///// Global Store
/////////
export const globalStore = defineStore('globalStore', () => {
    // user, artist, none
    const activeRole = "none";


    //When the user is connected we should get his profile in user
    const user = null
    function getMyProfile(id) {

    }

    return {
        activeRole
    }
});

