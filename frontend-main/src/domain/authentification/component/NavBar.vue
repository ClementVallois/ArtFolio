<template>
    <nav class="shadow " >
        <div class="container px-6 py-2 mx-auto ">
            <div class="md:flex justify-between items-center">
                <div class="flex justify-between items-center">
                    <router-link :to="{ name: 'home' }" class="text-gray-800 text-sm  md:mx-4">
                        <img class="max-w-[6rem]" src="@/assets/img/artfolio_logo_black.png" alt="logo Art Folio">
                    </router-link>
                    <div class="md:hidden">
                        <button type="button"
                            class="text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none"
                            @click="toggleOpen">
                            <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
                                <path
                                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                                </path>
                            </svg>
                        </button>

                    </div>
                </div>
                <div class="flex-col mt-3 md:flex-row md:mt-0 md:flex" :class="isOpen ? 'flex' : 'hidden'">
                    <p class="md:mx-4 text-sm">UserName</p>
                    <p class="md:mx-4 text-sm cursor-pointer" @click="logout" role="button">Se déconnecter</p> 
                </div>
            </div>
        </div>
    </nav>

</template>

<script setup>
// for component reactivity 
import { ref } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

const { logoutWithRedirect } = useAuth0()

// opens the menu in mobile mode
const isOpen = ref(false);
const toggleOpen = () => { isOpen.value = !isOpen.value }

// to open the user or artist profile menu
const isProfileMenuOpen = ref(false);
const toggleProfileMenu = () => {
    isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

//Connect to Auth0 
const logout = async () => {
    try{
        await logoutWithRedirect()
    } catch (error) {
        console.error('error logging out :', error)
    }
}

</script>