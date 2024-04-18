<template>
    <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid lg:grid-cols-2 justify-center">
        <CardPostComponent :postId="post.id" v-for="(post, index) in allPostForArtist" :key="index"
            :postDescription="post.description" :postDate="formatDate(post.created_at)" />
    </div>
</template>

<script setup>
import {  defineProps, ref, onMounted } from 'vue';
import CardPostComponent from '@/domain/artist/components/toolbox/CardPostComponent.vue'
import { artistStore } from '@/domain/artist/store/artistStore';


const props = defineProps({
    postDescription: String,
    postDate: String,
    postPictureUrl: String,
    artistId: String,
    postId: String
});



// Récupérez les posts demandés 
const artistsStore = artistStore();
const allPostForArtist = ref([])
onMounted(async () => {
    allPostForArtist.value = await artistsStore.getArtistPosts(props.artistId);

});



// permet de formater la date 
function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", options).replace(',', ' à');
}






</script>