import { defineStore } from 'pinia';
import { postService } from '@/domain/artist/service/PostService.js';
import { ref } from 'vue';

/////////
///// Posts Store
/////////
export const postStore = defineStore('postStore', () => {
    const servicePost = postService();

    const assetForPost = ref([])

    async function getAssetForPost(id) {
        assetForPost.value = await servicePost.getAssetForPost(id);
    }

    async function createPost(data) {
        return await servicePost.createPost(data);
    };

    return {
        assetForPost,
        getAssetForPost,
        createPost
    }
});

