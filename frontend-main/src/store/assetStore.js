import { defineStore } from 'pinia';
import { dataSourceAssets } from '@/api/assetsDataSource.js';
import { Optional } from '@/optionnal';
import { ref, computed } from 'vue';


/////////
///// Assets Store
/////////
export const assetsStore = defineStore('assetsStore', () => {
    const allAssetsData = ref(Optional.of(dataSourceAssets));

    const getAllPostAssets = computed(() => {
        return !allAssetsData.value.isEmpty()
            ? allAssetsData.value.get().filter(asset => asset.type === "post_picture")
            : [];
    });
    // const getAllPosts = computed(() => {
    //     return !allPostsData.value.isEmpty()
    //         ? allPostsData.value.get()
    //         : [];
    // });


    return {
        allAssetsData,
        getAllPostAssets
    }
});

