import { defineStore } from 'pinia';
import { postService } from '@/domain/artist/service/PostService';
import { ref } from 'vue';

/////////
///// Posts Store
/////////
export const useStorePost = defineStore('postStore', () => {
    const servicePost = postService();

    const assetForPost = ref([])

    async function getAssetForPost(id) {
        assetForPost.value = await servicePost.getAssetForPost(id);
    }

    async function createPost(data) {
        return await servicePost.createPost(data);
    };

    async function deletePost(id) {
        return await servicePost.deletePost(id);
    }

    return {
        assetForPost,
        getAssetForPost,
        createPost,
        deletePost
    }
});

