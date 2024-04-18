<template>
    <div class="flex flex-col m-auto max-w-[95%] mb-[1rem] rounded overflow-hidden shadow-lg lg:w-[30vw] " >
        <div class="flex ">
            <div class="max-w-[20%]">  
                <img src="@/assets/img/profil.png" alt=""
                class="relative  rounded-lg overflow-hidden  ">
            </div>          
            <div class="text-start pl-[1rem]">
                <p class="text-xs font-boldText  lg:text-base"> John Doe</p>
                <p class="text-[0.7rem] font-lightText "> john.doe</p>
                <p class="text-[0.7rem] font-lightText lg:pt-[0.4rem] "> suspendo toties causa spero cunabula velociter defessus cui admitto tenus clementia aqua maiores vorax demonstro vulpes
                </p>
            </div>        
        </div>
        <img class="max-h-[15rem]  self-center cursor-pointer lg:max-h-[20rem]" src="@/assets/img/peinture.png">
        <div class="px-6 py-4 overflow-y-auto" style="height: calc(30vh - 4rem);">
            <div class="text-gray-700 text-base">
                <p>
                    adimpleo cogo volo attero capitulus adipiscor trepide clarus asperiores stultus ulciscor velociter synagoga quis absconditus victoria ater angulus comes civis vomica valetudo aureus aestus creator collum conspergo vulgaris
                </p>
                <p class="text-end text-xs pt-[1rem] font-lightText">12 avril 2024</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';
//import { postStore } from '@/domain/artist/store/PostStore';

const props = defineProps({
    postDescription: String,
    postDate: String,
    postPictureUrl: String,
    postId: String,
    postIsPinned: Boolean,
});


</script>