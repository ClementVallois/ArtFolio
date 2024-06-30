<template>
    <nav class="shadow ">
        <div class="container px-6 py-2 mx-auto r  h-full">
            <div class="md:flex justify-between items-center">
                <div class="flex justify-between items-center">
                    <router-link :to="{ name: 'home' }" class="text-gray-800 text-sm  md:mx-4">
                        <img class="max-w-[6rem]" src="@/assets/img/artfolio_logo_black.png" alt="logo Art Folio">
                    </router-link>
                    <div class="md:hidden">
                        <button type="button"
                            class="text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none"
                            @click="toggleOpen"
                            ref= "elementClickOutsideMobile"
                            >
                            <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
                                <path
                                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                                </path>
                            </svg>
                        </button>

                    </div>
                </div>
                <div class="flex-col mt-3 md:flex-row md:mt-0 md:flex" :class="isOpen ? 'flex' : 'hidden'">
                    <!-- menu desktop + mobile-->
                    <router-link :to="{ name: 'search' }" class="text-gray-800 text-sm  md:mx-4">
                        <SearchComponent></SearchComponent>
                    </router-link>
                    <router-link :to="{ name: 'chat' }" class="text-sm  md:mx-4 md:flex md:justify-center
                    md:items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                            class="bi bi-chat-fill hidden md:flex" viewBox="0 0 16 16">
                            <path
                                d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
                        </svg>
                        <p class="md:hidden pt-4 ">Messagerie</p>
                    </router-link>

                    <!--  Profil section -  mobile mode -->
                    <hr class="md:hidden border-t border-gray-200 my-4 w-full">
                    <CustomLinkComponent :to="{ name: 'registration' }" text="Modifier mon profil"
                        class="md:hidden md:mx-4  pb-4" />
                    <CustomLinkComponent :to="{ name: 'about' }" text="Accéder à mon profil"
                        class="md:hidden md:mx-4 pb-4" />
                    <!-- TODO: faire la méthode pour se déconnecter -->
                    <CustomLinkComponent :to="{ name: 'about' }" text="Se deconnecter" class="md:hidden md:mx-4 pb-3" />
                    <!-- Profile section - desktop mode -->
                    <div class=" relative flex justify-center
                        align-center hidden sm:flex" @click="toggleProfileMenu" ref="elementClickOutsideDesktop">
                        <button type="button ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path fill-rule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                            </svg>
                        </button>
                        <!-- Profile dropdown menu content -->
                        <div v-if="isProfileMenuOpen"
                            class="origin-top-right absolute top-[60px] right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <CustomLinkComponent :to="{ name: 'registration' }" text="Modifier mon profil"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" />
                                <!-- TODO: faire la méthode pour se déconnecter -->
                                <p  type="button"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                    @click="logoutApp">
                                    Se déconnecter
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

</template>

<script setup>
// for component reactivity 
import { ref, watchEffect, onUnmounted } from 'vue';
import CustomLinkComponent from '@/components/toolBox/CustomLinkComponent.vue';
import SearchComponent from '@/components/toolBox/SearchComponent.vue';
import useClickOutside from '@/composable/useClickOutside';
import { useAuth0 } from '@auth0/auth0-vue';
import { useGlobalStore } from '@/store/GlobalStore';

const { logout } = useAuth0();
const globalStore = useGlobalStore()
const elementClickOutsideMobile = ref(null)
const elementClickOutsideDesktop = ref(null)

// opens the menu in mobile mode
const isOpen = ref(false);
const toggleOpen = () => { isOpen.value = !isOpen.value }

// to open the user or artist profile menu
const isProfileMenuOpen = ref(false);
const toggleProfileMenu = () => {
    isProfileMenuOpen.value = !isProfileMenuOpen.value;
}

const logoutApp = () => {
    globalStore.resetProfile()
    logout()
}

// ajouter le fait que le menu déroulant du profil se ferme quand on clique en dehors
const handleClickOutside = () => {
    isProfileMenuOpen.value=false
    isOpen.value=false
}
useClickOutside([elementClickOutsideDesktop, elementClickOutsideMobile], handleClickOutside);

</script>