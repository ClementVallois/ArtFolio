<template>
    <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid lg:grid-cols-2 justify-center">
        <CardPostComponent :postId="post.id" v-for="(post, index) in artistStore.artistPosts" :key="index"
            :postDescription="post.description" :postDate="formatDate(post.createdAt)"  :postIsPinned="post.isPinned"/>
    </div>
</template>

<script setup>
import {  defineProps, ref, onMounted } from 'vue';
import CardPostComponent from '@/domain/artist/components/toolbox/CardPostComponent.vue'
import { useStoreArtist } from '@/domain/artist/store/ArtistStore';


const props = defineProps({
    postDescription: String,
    postDate: String,
    postPictureUrl: String,
    postIsPinned: Boolean,
    artistId: String,
    postId: String
});



// Récupérez les posts demandés 
const artistStore = useStoreArtist();

onMounted(async () => {
    await artistStore.getArtistPosts(props.artistId);
});



// permet de formater la date 
function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", options).replace(',', ' à');
}

</script>