import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import { profileService } from '@/service/ProfileService.js';
import { useGlobalStore } from '@/store/GlobalStore';

export const useAuthenticationPersistStore = defineStore('authenticationPersistStore', () => {

    const profile = ref(null)

    const globalStore = useGlobalStore()

    async function storeProfileFromAuth0Id(auth0id) {
        try {
            const user = await profileService().getProfileWithAuth0Id(auth0id)
            profile.value = toRaw(user)
        } catch (error) {
            globalStore.logError(error, 6)
        }
    }

    function resetProfile() {
        profile.value = null
    }

    return {
        profile,
        storeProfileFromAuth0Id,
        resetProfile,
    }

}, {persist: true}) 