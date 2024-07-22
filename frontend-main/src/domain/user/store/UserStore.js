import { defineStore } from 'pinia';
import { userService } from '@/domain/user/service/UserService.js';
import { ref, toRaw } from 'vue'
import { authenticationService } from '@/domain/authentification/services/AuthenticationService';

/////////
///// User Store
/////////
export const useStoreUser = defineStore('userStore', () => {

    const serviceUser = userService();
    const userId = ref("");
    const user = ref("");
    ////
    // basique CRUD for user
    ////
    async function createUser(data) {
        const response = await serviceUser.createUser(data);
        if (response.status === 201) {
            userId.value = response.data.userId;
        }
        return response;
    };

    async function getUserById(id) {
        user.value = await serviceUser.getUserById(id);
        return user.value;
    };

    async function modifyUser(id, data) {
        const response = await serviceUser.modifyUser(id, data);
        if (response.status) {
            console.log(response.status);
        }
        return response;
    }

    async function deleteUser(id, auth0Id) {
        const response = await serviceUser.deleteUser(id);
        await authenticationService().deleteUser(auth0Id)
        if (response.status) {
            console.log(response.status);
        }

        return response;
    }

    return {
        userId,
        user,
        createUser,
        getUserById,
        modifyUser,
        deleteUser,
    }
});

