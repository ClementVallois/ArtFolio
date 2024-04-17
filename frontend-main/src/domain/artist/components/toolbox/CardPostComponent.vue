<template>
    <div class="flex flex-col m-auto max-w-[95%] mb-[1rem] rounded overflow-hidden shadow-lg lg:w-[35vw] ">
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
import { defineProps, toRaw, onMounted, ref } from 'vue';
//import { assetsStore } from '@/store/assetStore';

const props = defineProps({
    postDescription: String,
    postDate: String,
    postPictureUrl: String,
    postId: String
});

// const storeAssets = assetsStore();

// const allAssetsPostData = JSON.parse(JSON.stringify(toRaw(storeAssets.getAllPostAssets)));
// const assetForPost = allAssetsPostData.filter(asset => asset.post_id === props.postId);

// // vérifie si il y a bien une image sinon renvoit une chaine vide.
// const imageUrl = assetForPost[0] ? assetForPost[0].url : '';

</script>