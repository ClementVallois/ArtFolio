<template>
    <TitleComponent title="Artiste"> </TitleComponent>
    <div class="border w-[30vw]">
        User {{ id }}
        First-name {{ artist.first_name }}
        Last-name {{ artist.last_name }}
    </div>
</template>

<script setup>

import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import { toRaw, defineProps } from 'vue';
import { artistStore } from '@/domain/artist/store/artistStore';

const props = defineProps({
    id: String
})

// Récupérez l'artist demandé
const storeArtist = artistStore();
const allArtistData = JSON.parse(JSON.stringify(toRaw(storeArtist.getAllArtist)));
const artist = allArtistData.find(artist => artist.uuid === props.id);

</script>