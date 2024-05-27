import { defineStore } from 'pinia';
import { userService } from '@/domain/user/service/UserService.js';
import { ref, toRaw } from 'vue'

/////////
///// User Store
/////////
export const useStoreUser = defineStore('userStore', () => {

    const serviceUser = userService();

    ////
    // basique CRUD for user
    ////
    async function createUser(data) {
        return await serviceUser.createUser(data);
    };


    return {
        createUser,
    }
});

