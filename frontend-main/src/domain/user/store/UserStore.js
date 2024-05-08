import { defineStore } from 'pinia';
import { userService } from '@/domain/user/service/UserService.js';
import { ref, toRaw } from 'vue'

/////////
///// User Store
/////////
export const useStoreUser = defineStore('userStore', () => {

    const serviceUser = userService();

    const userProfile = ref(null)
    const activeRole = ref('none')

    ////
    // basique CRUD for user
    ////
    async function createUser(data) {
        return await serviceUser.createUser(data);
    };

    
    async function storeUserProfileFromAuth0Id(auth0id) {
        const user = await userService().getUserWithAuth0Id(auth0id)
        userProfile.value = toRaw(user)
        console.log('userProfile.value', userProfile.value)
    }

    function storeUserRole() {
        if (userProfile.value != null) {
            activeRole.value = userProfile.value.role
            console.log('activeRole', activeRole.value)
        }
    }

    async function storeUserProfileFromAuth0IdAndUserRole(auth0id) {
        await storeUserProfileFromAuth0Id(auth0id)
        storeUserRole()
    }


    return {
        userProfile,
        activeRole,
        createUser,
        storeUserProfileFromAuth0Id,
        storeUserRole,
        storeUserProfileFromAuth0IdAndUserRole
    }
});

