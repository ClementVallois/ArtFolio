import { postApi } from '@/domain/artist/api/PostRemoteDataSource';
import { Post } from '@/domain/artist/model/PostModel';
import { useGlobalStore } from '@/store/GlobalStore.js';
import { Asset } from '@/model/AssetModel';

function postService() {
    const storeGlobal = useGlobalStore();
    const apiPost = postApi();
    ////
    // basique CRUD for post
    ////
    // TODO: faire le lien et modifier le store
    async function getAssetForPost() {
        try {
            const response = await apiPost.getAssetForPost();
            if (Array.isArray(response)) {
                return response.map(jsonAssets => Asset.fromJson(jsonAssets));
            }
            if (!Array.isArray(response)) {
                console.log(response);
                return Asset.fromJson(response);
            } else {
                storeGlobal.logError("La réponse n'est pas un tableau d'objets JSON : " + response, 6);
                return [];
            }
        } catch (error) {
            storeGlobal.logError("Erreur lors de la récupération d'un asset pour les post' : " + error, 6);
        }
    }

    async function createPost(data) {
        try {
            const response = await apiPost.createPost(data);
            return response;
        } catch (error) {
            storeGlobal.logError("Erreur lors de l'enregistrement d'un post' : " + error.message, 6);
            throw new Error(error.message);
        }
    }

    return {
        getAssetForPost,
        createPost
    }
}

export { postService };