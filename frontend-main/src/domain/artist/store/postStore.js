import { defineStore } from 'pinia';
import { dataSourcePosts } from '@/domain/artist/api/postsDataSource.js';
import { Optional } from '@/optionnal';
import { ref, computed } from 'vue';


/////////
///// Posts Store
/////////
export const postStore = defineStore('postStore', () => {
    const allPostsData = ref(Optional.of(dataSourcePosts));


    const getAllPosts = computed(() => {
        return !allPostsData.value.isEmpty()
            ? allPostsData.value.get()
            : [];
    });


    return {
        allPostsData,
        getAllPosts
    }
});

