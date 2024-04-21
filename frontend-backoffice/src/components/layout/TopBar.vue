<template>
        <div class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b">
            <div class="cursor-pointer w-[30px]" @click="emit('toggleSideBar')">
                <i class="fas fa-bars text-xl"></i>
            </div>
            <!-- Search bar -->
            <div class="w-[calc(100%-200px)] flex justify-center">
                <p>Dashboard Admin</p>
            </div>
            <!-- User -->
            <div class="w-[200px] cursor-pointer" @click="toggleMenuUser" >
                <div class="flex items-center justify-end space-x-4">
                    <i class="fas fa-user text-xl"></i>
                    <div class="flex flex-col w-[80%]">
                        <p>Natacha Desse</p>
                        <p class="text-xs">Admin</p>
                    </div>
                </div>
                <!-- DropDown -->
                <div v-show="showMenuUser" class="absolute right-[10px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1 text-left">
                        <!-- Profile Link -->
                        <router-link to="/profile" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                            <i class="fas fa-user text-s pr-5"></i>
                            Profile
                        </router-link>
                        <!-- Logout Link -->
                        <a href="#" @click="logoutApp" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                            <i class="fas fa-sign-out-alt text-s pr-5"></i>
                            Log out
                        </a>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>

import { ref, defineEmits } from 'vue';

//AUTH0 REACTIVATE
import { useAuth0 } from '@auth0/auth0-vue';

const emit = defineEmits();
const showMenuUser = ref(false)
const toggleMenuUser = () => {
    showMenuUser.value=!showMenuUser.value
}

//AUTH0 REACTIVATE
const { logout } = useAuth0();

const logoutApp = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
}



</script>