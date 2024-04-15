<template>
    <div class="flex flex-col m-auto max-w-[95%] mb-[1rem] rounded overflow-hidden shadow-lg lg:w-[35vw] ">
        <img class="max-h-[15rem] lg:max-h-[20rem] self-center" src="@/assets/img/peinture.png"
            alt="Sunset in the mountains">
        <div class="px-6 py-4 overflow-y-auto" style="height: calc(30vh - 4rem);">
            <div class="text-gray-700 text-base">
                <p>
                    {{ props.postDescription }}
                </p>
                <p class="text-end text-xs pt-[1rem]">{{ props.postDate }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    postDescription: String,
    postDate: String,
    postPictureUrl: String,

});
</script>