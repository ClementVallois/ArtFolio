import { defineStore } from 'pinia';
import { amateurService } from '@/domain/amateur/service/AmateurService.js';
import { ref, toRaw } from 'vue'
import { authenticationService } from '@/domain/authentification/services/AuthenticationService';

/////////
///// Amateur Store
/////////
export const useStoreAmateur = defineStore('amateurStore', () => {

    const serviceAmateur = amateurService();
    const amateurId = ref("");
    const user = ref("");
    ////
    // basique CRUD for amateur
    ////
    async function createAmateur(data) {
        const response = await serviceAmateur.createAmateur(data);
        if (response.status === 201) {
            amateurId.value = response.data.userId;
        }
        return response;
    };


    return {
        amateurId,
        createAmateur,
    }
});

