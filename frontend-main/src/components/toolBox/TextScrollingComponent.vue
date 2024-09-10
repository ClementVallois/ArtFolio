<template>
    <div class="marquee-rtl w-[100vw] bg-black py-[2rem] lg:py-[4rem]">
        <h1 class="font-title text-3xl lg:text-8xl text-white">{{ props.text }}</h1>
    </div>
</template>

<script setup>
const props = defineProps({
    text: String,
});
</script>

<style scoped>

.marquee-rtl {                 /* largeur de la fenêtre */
    margin: 1em auto 2em;
    overflow: hidden;                   
  }


  .marquee-rtl > :first-child {
    display: inline-block;                /* modèle de boîte en ligne */
    padding-right: 2em;                   /* un peu d'espace pour la transition */
    padding-left: 100%;                   /* placement à droite du conteneur */
    white-space: nowrap;                  /* pas de passage à la ligne */
    animation: defilement-rtl 25s infinite linear;
  }


  @keyframes defilement-rtl {
    0% {
      transform: translate3d(0,0,0);      /* position initiale à droite */
    }
    100% {
      transform: translate3d(-100%,0,0);  /* position finale à gauche */
    }
  }
</style>