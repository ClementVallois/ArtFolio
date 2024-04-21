<template>
  
  <!-- <div v-if="isLoading">
    <PageLoader />
  </div> -->
  <router-view />
  
  <!-- If is Authenticated get the structure layout
  <div v-if="isAuthenticated">
    <div  class="w-screen h-screen flex"> 
      <SideBar  v-show=showSideBar />
      <div class="w-full h-full bg-gray-400">
        <TopBar @toggleSideBar="toggleSideBar()"/>
        <router-view />
      </div>
    </div>
  </div>
  Else get the simple page 
  <div v-else>
    <router-view />
  </div> -->


</template>

<script setup>
import { ref } from 'vue'
import SideBar from '@/components/layout/SideBar.vue';
import TopBar from '@/components/layout/TopBar.vue';
//AUTH0 REACTIVATE
import { useAuth0 } from '@auth0/auth0-vue';
import PageLoader from '@/pages/LoaderPage.vue'
const { isLoading, error } = useAuth0();


const showSideBar = ref(true)

const toggleSideBar = () => { 
  showSideBar.value=!showSideBar.value
}


</script>
