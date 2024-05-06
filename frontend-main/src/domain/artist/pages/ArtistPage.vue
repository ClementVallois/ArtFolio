<template>
    <div class="w-[100vw] flex flex-col items-center my:[1rem] lg:my-[2rem] lg:flex-row lg:items-start">
        <InformationBlocArtistPageComponent :artistId="artistId"></InformationBlocArtistPageComponent>
        <CardListComponent :artistId="artistId"></CardListComponent>
    </div>

</template>

<script setup>
import CardListComponent from '@/domain/artist/components/toolbox/CardListComponent.vue';
import InformationBlocArtistPageComponent from '@/domain/artist/components/toolbox/InformationBlocArtistPageComponent.vue';
import { defineProps } from 'vue';

const props = defineProps({
    artistId: String
})
console.log(props.artistId);
</script>