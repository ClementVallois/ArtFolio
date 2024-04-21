<template>
    <PageLayout>
        <div class="h-[calc(100%-50px)] bg-white flex flex-col items-center justify-center">
            <h1 class="font-title text-[2rem]">Bienvenue sur la plateforme administrateur</h1>
            <p>Navigue sur les onglets pour commencer</p>
            <button @click="getAccessTokenManagementAPI"> Get access Token </button>
        </div>
    </PageLayout>
</template>

<script setup>
import PageLayout from '@/components/layout/PageLayout.vue';
let showSideBar = true
import { getAccessTokenManagementAPI } from '@/domain/auth0/api/Auth0ManagementAPI'

const toggleSideBar = () => {
    showSideBar=!showSideBar
}

</script>