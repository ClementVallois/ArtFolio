<template>
    <div class="h-[calc(100%-50px)] bg-white flex items-center justify-center">
        This is the dashboard Admin
    </div>
</template>

<script setup>
let showSideBar = true

const toggleSideBar = () => {
    showSideBar=!showSideBar
}

</script>