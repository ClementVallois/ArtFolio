<template>
  <div class="w-screen h-screen flex"> 
    <SideBar v-show=showSideBar />
    <div class="w-full h-full bg-gray-400">
      <TopBar @toggleSideBar="toggleSideBar()"/>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SideBar from '@/components/layout/SideBar.vue';
import TopBar from '@/components/layout/TopBar.vue';

const showSideBar = ref(true)

const toggleSideBar = () => { 
  showSideBar.value=!showSideBar.value
}

</script>