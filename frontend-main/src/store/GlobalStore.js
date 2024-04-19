import { defineStore } from 'pinia';

/////////
///// Global Store
/////////
export const globalStore = defineStore('globalStore', () => {
    // user, artist, none
    const activeRole = "artist";

    return {
        activeRole
    }
});

