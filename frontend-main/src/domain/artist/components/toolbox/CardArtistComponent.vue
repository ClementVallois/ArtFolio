<template>
    <div class="flex flex-col m-auto max-w-[95%] mb-[1rem] rounded overflow-hidden shadow-lg lg:w-[30vw]">
        <router-link :to="{ name: 'artist', params: { artistId: props.artistId } }" class="flex">
            <div class="max-w-[10%]">  
                <img src="@/assets/img/profil.png" alt="" class="relative rounded-lg overflow-hidden">
            </div>   
            <div class="text-start pl-[1rem]">
                <p class="text-xs font-boldText lg:text-base">{{ props.artistFirstName + " " + props.artistLastName }}</p>
                <p class="text-[0.7rem] font-lightText">{{ props.artistUsername }}</p>
            </div>         
        </router-link>
        <img class="max-h-[15rem] self-center  lg:max-h-[20rem]" src="@/assets/img/peinture.png">
        <div class="px-6 py-4 overflow-y-auto" style="height: calc(30vh - 7rem);">
            <div class="flex flex-col justify-between text-gray-700 text-base h-[100%]">
                <p>{{ props.postDescription }}</p>
                <p class="text-end text-xs pt-[1rem] font-lightText ">12 avril 2024</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';


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


</script>