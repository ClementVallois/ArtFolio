<template>
  <Carousel :items-to-show="itemsToShow" :wrap-around="true">
    <template v-for="(item, index) in carousselData" :key="index">
      <Slide>
        <CardArtistComponent class="carousel__item" :postId="item.pinnedPost.id" :postDescription="item.pinnedPost.description" :artistFirstName="item.artist.firstName"  :artistLastName="item.artist.lastName" :artistUsername="item.artist.username" :artistId="item.artist.id"/>
      </Slide>
    </template>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script setup>
import { ref, onMounted, defineProps, computed } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import CardArtistComponent from '@/domain/artist/components/toolbox/CardArtistComponent.vue'
import 'vue3-carousel/dist/carousel.css'

const props = defineProps({
  carousselData: Array
})

const itemsToShow = ref(2.5); // Garde le même ratio par défaut

const adjustItemsToShow = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 768) {
    itemsToShow.value = 1.5; // Réduit à une seule carte pour les écrans plus petits
  } else {
    // Garde le même ratio pour les écrans plus larges
    itemsToShow.value = Math.min(4.5, Math.max(2.5, (screenWidth / 400))); 
  }
};

// Appelez la fonction d'ajustement au chargement de la page et lorsqu'elle est redimensionnée
onMounted(adjustItemsToShow);
window.addEventListener('resize', adjustItemsToShow);

const slides = computed(() => {
  const chunkSize = 1; // Nombre d'entités par diapositive
  const chunks = [];
  for (let i = 0; i < props.carousselData.length; i += chunkSize) {
    chunks.push(props.carousselData.slice(i, i + chunkSize));
  }
  return chunks;
});

const svgElement = document.querySelector('.carousel__icon');
if (svgElement) {
  svgElement.setAttribute('viewBox', '0 0 15 15'); 
}

</script>
