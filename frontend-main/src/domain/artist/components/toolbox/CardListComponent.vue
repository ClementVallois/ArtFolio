<template>
    <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid lg:grid-cols-2 justify-center">
        <CardPostComponent :postId="post.id" v-for="(post, index) in allPostForArtist" :key="index"
            :postDescription="post.description" :postDate="formatDate(post.created_at)" />
    </div>
</template>

<script setup>
import { toRaw, defineProps } from 'vue';
import { postStore } from '@/domain/artist/store/postStore';
import CardPostComponent from '@/domain/artist/components/toolbox/CardPostComponent.vue'
import { assetsStore } from '@/store/assetStore';

const props = defineProps({
    postDescription: String,
    postDate: String,
    postPictureUrl: String,
    artistId: String,
    postId: String
});


// Récupérez les posts demandés 
const storePost = postStore();
const allPostsData = JSON.parse(JSON.stringify(toRaw(storePost.getAllPosts)));
const allPostForArtist = allPostsData.filter(post => post.user_id === props.artistId);

// permet de formater la date 
function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", options).replace(',', ' à');
}


</script>