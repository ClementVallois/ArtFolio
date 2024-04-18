import { defineStore } from 'pinia';
import { Post } from '@/domain/artist/model/PostModel';
import { Asset } from '@/model/AssetModel';
import { postApi } from '@/domain/artist/api/PostRemoteDataSource';
/////////
///// Posts Store
/////////
export const postStore = defineStore('postStore', () => {


    async function getAssetForPost(id) {
        try {
            const response = await postApi().getAssetForPost(id);
            if (Array.isArray(response)) {
                return response.map(jsonAssets => Asset.fromJson(jsonAssets));
            }
            if (!Array.isArray(response)) {
                console.log(response);
                return Asset.fromJson(response);
            } else {
                console.error("La réponse n'est pas un tableau d'objets JSON :", response);
                return [];
            }
        } catch (error) {
            console.log(error);
            console.error("Erreur lors de la récupération d'un asset pour les post' :", error);
        }
    }

    return {
        getAssetForPost
    }
});

