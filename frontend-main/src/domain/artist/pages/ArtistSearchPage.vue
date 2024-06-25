<template>
    <TitleComponent title="Recherche de vos artistes" class="py-4"> </TitleComponent>
    <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid lg:grid-cols-2 justify-center">
        <CardArtistComponent v-for="(item, index) in artistStore.resultSearchArtist" :key="index"
        class="carousel__item" :postId="item.pinnedPost.id" :postDescription="item.pinnedPost.description" :artistFirstName="item.artist.firstName"  :artistLastName="item.artist.lastName" :artistUsername="item.artist.username" :artistId="item.artist.id"/>
    </div>

    <div v-if="artistStore.isSearchArtist && artistStore.resultSearchArtist.length == 0" >
        <p class="pl-4 px-[1rem] ml-[2rem] py-[2rem]">Désolé, il semblerait qu'il n'y ait aucun artiste associé à ta recherche... </p>
    </div>

</template>

<script setup>
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import CardArtistComponent from '@/domain/artist/components/toolbox/CardArtistComponent.vue'
import { useStoreArtist } from '@/domain/artist/store/ArtistStore';

const artistStore = useStoreArtist()

</script>