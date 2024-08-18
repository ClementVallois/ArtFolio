<template>
    <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid lg:grid-cols-2 justify-center">
        <CardPostComponent @postDeleted="handlePostDeleted" :postId="post.id"
            v-for="(post, index) in artistStore.artistPosts" :key="index" :postDescription="post.description"
            :postDate="formatDate(post.createdAt)" :postIsPinned="post.isPinned" :artistId="artistId"
            :myProfile="myProfile" />
    </div>
</template>

<script setup>
import { defineProps, ref, onMounted, } from 'vue';
import CardPostComponent from '@/domain/artist/components/toolbox/CardPostComponent.vue'
import { useStoreArtist } from '@/domain/artist/store/ArtistStore';


const props = defineProps({
    postDescription: String,
    postDate: String,
    postPictureUrl: String,
    postIsPinned: Boolean,
    artistId: String,
    postId: String,
});

const myProfile = ref(false);

// Récupérez les posts demandés 
const artistStore = useStoreArtist();

const storeArtistId = artistStore.artistId;


onMounted(async () => {
    await artistStore.getArtistPosts(props.artistId);


});

// Vérifie si l'artiste consulte son profil ou celui d'un autre artist
if (storeArtistId == props.artistId) {
    myProfile.value = true;
}

// permet de formater la date 
function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", options).replace(',', ' à');
}

async function handlePostDeleted() {
    await artistStore.getArtistPosts(props.artistId);
}

</script>