<template>


<form class="flex items-center">
    <label for="simple-search" class="sr-only">Rechercher</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-black" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
        </div>
        <input type="text" id="simple-search" :value="searchValue" @input="updateFilterValue" class="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-2 focus-visible:ring-black-500 focus:ring-black-500 focus:border-black-500 block w-full pl-10 p-2 outline-none" placeholder="Rechercher" required="">
    </div>
</form>


</template>


<script setup>
import { ref } from 'vue'
import { useStoreUser } from '../store/UserStore.js'

const storeUser = useStoreUser()
const searchValue = ref('')
const emit = defineEmits(['isSearchActive'])

const updateFilterValue = event => {
    searchValue.value = event.target.value;
    if (searchValue.value != '') {
        storeUser.filterDataUser(searchValue)
        emit('isSearchActive', true)
    } else {
        emit('isSearchActive', false)
    }
};

</script>../store/UserStore.js