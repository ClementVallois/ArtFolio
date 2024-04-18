<template>
    <PageLayout>
        <div class="h-[calc(100%-50px)] bg-white flex items-center justify-center">
            This is the dashboard Admin
        </div>
    </PageLayout>
</template>

<script setup>
import PageLayout from '@/components/layout/PageLayout.vue';
let showSideBar = true

const toggleSideBar = () => {
    showSideBar=!showSideBar
}

</script>