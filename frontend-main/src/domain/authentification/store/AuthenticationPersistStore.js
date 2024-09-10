import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import { profileService } from '@/service/ProfileService.js';
import { userService } from '@/domain/user/service/UserService';
import { useGlobalStore } from '@/store/GlobalStore';

export const useAuthenticationPersistStore = defineStore('authenticationPersistStore', () => {

    const profile = ref(null)
    const profilePicture = ref(null)

    const globalStore = useGlobalStore()

    async function storeProfileFromAuth0Id(auth0id) {
        const user = await profileService().getProfileWithAuth0Id(auth0id)
        profile.value = toRaw(user)
        await storeProfilePicture(user.id)
    }

    async function storeProfilePicture(id) {
        profilePicture.value = await userService().getUserProfilePicture(id)
    }
    
    function resetProfile() {
        profile.value = null
        profilePicture.value = null
    }
    
    async function deleteProfile(type, id, auth0Id) {
        const response = await profileService().deleteProfile(type, id, auth0Id)
        resetProfile()
        return response
    }

    return {
        profile,
        profilePicture,
        storeProfileFromAuth0Id,
        storeProfilePicture,
        resetProfile,
        deleteProfile
    }

}, {persist: true}) 