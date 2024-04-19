<template>
    <div class="flex flex-col m-auto max-w-[95%] mb-[1rem] rounded overflow-hidden shadow-lg lg:w-[35vw] "  :class="{ 'border-black border-2': props.postIsPinned }">
        <img class="max-h-[15rem]  self-center cursor-pointer lg:max-h-[20rem]" src="@/assets/img/peinture.png">
        <div class="px-6 py-4 overflow-y-auto" style="height: calc(30vh - 4rem);">
            <div class="text-gray-700 text-base">
                <p>
                    {{ props.postDescription }}
                </p>
                <p class="text-end text-xs pt-[1rem] font-lightText">{{ props.postDate }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps,} from 'vue';
//import { postStore } from '@/domain/artist/store/PostStore';

const props = defineProps({
    postDescription: String,
    postDate: String,
    postPictureUrl: String,
    postId: String,
    postIsPinned: Boolean,
});


// Récupérez les assets pour les posts
// const postsStore = postStore();
// const assetsForPost = ref([])
// onMounted(async () => {
//     console.log(props.postId);
//     assetsForPost.value = await postsStore.getAssetForPost(props.postId);
// });


</script>

