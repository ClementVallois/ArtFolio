import { postApi } from '@/domain/artist/api/PostRemoteDataSource';
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
            const { data } = await apiPost.getAssetForPost();
            if (Array.isArray(data)) {
                return data.map(jsonAssets => Asset.fromJson(jsonAssets));
            }
            if (!Array.isArray(data)) {
                console.log(data);
                return Asset.fromJson(data);
            } else {
                storeGlobal.logError("La réponse n'est pas un tableau d'objets JSON : " + data, 6);
                return [];
            }
        } catch (error) {
            storeGlobal.logError("Erreur lors de la récupération d'un asset pour les post' : " + error, 6);
        }
    }

    async function createPost(data) {
        try {
            return await apiPost.createPost(data);

        } catch (error) {
            storeGlobal.logError("Erreur lors de l'enregistrement d'un post' : " + error.message, 6);
            throw new Error(error.message);
        }
    }

    async function deletePost(id) {
        try {
            return await apiPost.deletePost(id);
        } catch (error) {
            storeGlobal.logError("Erreur lors de la suppression du post' : " + error.message, 6);
            throw new Error(error.message);
        }
    }

    async function getPostAssetWithId(id) {
        try{
            const response = await apiPost.getAssetForPost(id)
            const blob = new Blob([response.data], { type: 'image/webp' });
            const url = URL.createObjectURL(blob)
            return url
        } catch (error) {
            storeGlobal.logError("Erreur lors de la recuperation d'un post' : " + error.message, 6);
            throw new Error(error.message);
        }
    }

    return {
        getAssetForPost,
        createPost,
        deletePost,
        getPostAssetWithId
    }
}

export { postService };