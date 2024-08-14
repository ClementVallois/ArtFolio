<template>
    <div class="flex flex-col m-auto max-w-[95%] mb-[1rem] rounded overflow-hidden shadow-lg lg:w-[30vw] h-[400px]">
    <!-- <div class="flex flex-col m-auto max-w-[95%] mb-[1rem] rounded overflow-hidden shadow-lg lg:w-[30vw]"> -->
        <router-link :to="{ name: 'artist', params: { artistId: props.artistId } }" class="flex">
            <div class="max-w-[10%] max-h-[9%] p-1">
                <img :src="profilePictureUrl" alt="pp" class="w-full h-auto rounded-lg object-cover">
            </div>
            <div class="text-start pl-[1rem]">
                <p class="text-xs font-boldText lg:text-base">{{ props.artistFirstName + " " + props.artistLastName }}</p>
                <p class="text-[0.7rem] font-lightText">{{ props.artistUsername }}</p>
            </div>         
        </router-link>
        <img class="max-h-[15rem] lg:max-h-[17rem] w-full h-full object-cover" :src="postUrl" alt="Pinned post">
        <div class="px-6 py-4 overflow-y-auto" style="height: calc(30vh - 7rem);">
            <div class="flex flex-col justify-between text-gray-700 text-base h-[100%]">
                <p>{{ props.postDescription }}</p>
                <p class="text-end text-xs pt-[1rem] font-lightText ">12 avril 2024</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { postService } from '@/domain/artist/service/PostService'
import { artistService } from '@/domain/artist/service/ArtistService'

const postUrl = ref(null)
const profilePictureUrl =ref(null)

const props = defineProps({
    postDescription: String,
    postDate: String,
    postPictureUrl: String,
    postId: String,
    postIsPinned: Boolean,
    artistFirstName: String,
    artistLastName: String,
    artistUsername: String,
    artistId: String
});

onMounted(async ()=> {
    postUrl.value = await postService().getPostAssetWithId(props.postId)
    profilePictureUrl.value = await artistService().getArtistProfilePicture(props.artistId)
})


</script>

