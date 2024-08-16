<template>
    <!-- Side bar -->
    <div class="w-[400px] h-full bg-gray-200 text-white">
        <div class="h-[50px] bg-gray-900 flex justify-start items-center">
            <div class="px-[25px] h-[64px] flex items-center text-center">
                <h1 class="font-title text-[2rem]">ArtFolio</h1>
            </div>
        </div>
        <div class="h-[calc(100vh-50px)] bg-gray-800 py-[20px]">
            <div class="px-[20px] flex-col space-y-[10px]">
                <router-link to="/"
                    class="inline-flex relative items-center py-[10px] w-full text-sm font-medium border-gray-200 hover:bg-gray-200 group hover:text-gray-800">
                    <i class="fas fa-home text-white text-l px-[10px] group-hover:text-gray-800"></i>
                    <p>Home</p>
                </router-link>
                <router-link to="/artist"
                    class="inline-flex relative items-center py-[10px] w-full text-sm font-medium border-gray-200 hover:bg-gray-300 group hover:text-gray-800">
                    <i class="fas fa-palette text-white text-l px-[10px] group-hover:text-gray-800"></i>
                    <p>Artist List</p>
                </router-link>
                <router-link to="/artistAuth0"
                    class="inline-flex relative items-center py-[10px] w-full text-sm font-medium border-gray-200 hover:bg-gray-300 group hover:text-gray-800">
                    <i class="fas fa-palette text-white text-l px-[10px] group-hover:text-gray-800"></i>
                    <p>Artist Auth 0 List</p>
                </router-link>
                <router-link to="/user"
                    class="inline-flex relative items-center py-[10px] w-full text-sm font-medium border-gray-200 hover:bg-gray-300 group hover:text-gray-800">
                    <i class="fas fa-people-group text-white text-l px-[10px] group-hover:text-gray-800"></i>
                    <p>User List</p>
                </router-link>
                <router-link to="/personalDataRequests"
                    class="inline-flex relative items-center py-[10px] w-full text-sm font-medium border-gray-200 hover:bg-gray-300 group hover:text-gray-800">
                    <i class="fas fa-people-group text-white text-l px-[10px] group-hover:text-gray-800"></i>
                    <p>Personal Data Requests List</p>
                </router-link>
            </div>
        </div>
    </div><!-- Side bar -->
</template>

<script setup>
let showSideBar = true

const toggleSideBar = () => {
    showSideBar = !showSideBar
}

</script>