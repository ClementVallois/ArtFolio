<template>
    <div class="w-[100vw] flex flex-col items-center">
        <InformationBlocArtistPageComponent :id="id"></InformationBlocArtistPageComponent>
        <CardPostComponent></CardPostComponent>
    </div>
</template>

<script setup>
import CardPostComponent from '@/domain/artist/components/toolbox/CardPostComponent.vue';
import InformationBlocArtistPageComponent from '@/domain/artist/components/toolbox/InformationBlocArtistPageComponent.vue';
import { defineProps } from 'vue';

const props = defineProps({
    id: String
})
</script>