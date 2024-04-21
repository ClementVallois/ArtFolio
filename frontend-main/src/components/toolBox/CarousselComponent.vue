<template>
    <Carousel :items-to-show="itemsToShow" :wrap-around="true">
        <Slide v-for="slide in 10" :key="slide">
        <CardArtistComponent class="carousel__item"> </CardArtistComponent>
        </Slide>
        <template #addons>
        <Navigation />
        </template>
    </Carousel>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import CardArtistComponent from '@/domain/artist/components/toolbox/CardArtistComponent.vue'
import 'vue3-carousel/dist/carousel.css'

// Valeur par défaut pour les écrans plus larges
const itemsToShow = ref(2.5); 

const adjustItemsToShow = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      itemsToShow.value = 1.5; 
    } else if (screenWidth > 768 && screenWidth <= 1100) {
      itemsToShow.value = 2.5; 
    } else if (screenWidth > 1100 && screenWidth <= 1400) {
      itemsToShow.value = 3; 
    } else if (screenWidth > 1400 && screenWidth <= 1700) {
      itemsToShow.value = 3.5; 
    } else {
      itemsToShow.value = 4.5; 
    }
};

  // Appelez la fonction d'ajustement au chargement de la page et lorsqu'elle est redimensionnée
onMounted(adjustItemsToShow);
window.addEventListener('resize', adjustItemsToShow);
</script>
