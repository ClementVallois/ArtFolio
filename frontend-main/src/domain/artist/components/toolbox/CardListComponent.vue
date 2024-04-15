<template>
    <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid lg:grid-cols-2 justify-center">
        <CardPostComponent v-for="(post, index) in allPostForArtist" :key="index" :postDescription="post.description"
            :postDate="post.created_at" />
    </div>
</template>

<script setup>
import { toRaw, defineProps } from 'vue';
import { postStore } from '@/domain/artist/store/postStore';
import CardPostComponent from '@/domain/artist/components/toolbox/CardPostComponent.vue'

const props = defineProps({
    postDescription: String,
    postDate: String,
    postPictureUrl: String,
    artistId: String
});


// Récupérez les posts demandés 
const storePost = postStore();
const allPostsData = JSON.parse(JSON.stringify(toRaw(storePost.getAllPosts)));
const allPostForArtist = allPostsData.filter(post => post.user_id === props.artistId);

console.log(allPostForArtist);
</script>