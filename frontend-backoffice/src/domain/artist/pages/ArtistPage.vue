<template>

<div class="h-[calc(100%-50px)] bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">

    <!-- Start block -->
    <SuccessAlert v-if="isSuccess" :message="successMessage" @closeAlert="toggleSuccessAlert()"/>
    <ErrorAlert v-if="isError" :message="errorMessage" />
    <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased w-full">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
            <!-- Start coding here -->
            <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div class="w-full md:w-1/2">
                        <SearchArtist @isSearchActive="activateSearch" />
                    </div>
                    <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <div class="flex items-center space-x-3 w-full md:w-auto">
                            <div id="filterDropdown" class="z-10 hidden w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                                <!-- <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Category</h6>
                                <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                                    <li class="flex items-center">
                                        <input id="artist" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                        <label for="artist" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Artists</label>
                                    </li>
                                    <li class="flex items-center">
                                        <input id="fitbit" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                        <label for="fitbit" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Users</label>
                                    </li>
                                </ul> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="overflow-y-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-4 py-4">Prénom</th>
                                <th scope="col" class="px-4 py-3">Nom</th>
                                <th scope="col" class="px-4 py-3">Identifiant</th>
                                <th scope="col" class="px-4 py-3">date de naissance</th>
                                <th scope="col" class="px-4 py-3">Role</th>
                                <th scope="col" class="px-4 py-3">
                                    <span class="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if='!isSearch' v-for="(artist, index) in storeArtist.artistsAll" :key="index" class="border-b dark:border-gray-700">
                                <td scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ artist.first_name }}</td>
                                <td class="px-4 py-3">{{ artist.last_name }}</td>
                                <td class="px-4 py-3">{{ artist.username }}</td>
                                <td class="px-4 py-3">{{ artist.birthdate }}</td>
                                <!-- <td class="px-4 py-3 max-w-[12rem] truncate">{{ artist.description }}</td> -->
                                <td class="px-4 py-3">{{ artist.role }}</td>
                            <!-- Actions column -->
                            <td class="px-4 py-3 flex items-center justify-end">
                                <!-- Buttons or actions for each user -->
                                <!-- <EditButton />
                                <PreviewButton /> -->
                                <DeleteButton @clickDelete="OpenDeleteModal(artist)" />
                            </td>
                            </tr>
                            <tr v-else v-for="(artist, indexFiltered) in storeArtist.artistFiltered" :key="indexFiltered" class="border-b dark:border-gray-700">
                                <td scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ artist.first_name }}</td>
                                <td class="px-4 py-3">{{ artist.last_name }}</td>
                                <td class="px-4 py-3">{{ artist.username }}</td>
                                <td class="px-4 py-3">{{ artist.birthdate }}</td>
                                <!-- <td class="px-4 py-3 max-w-[12rem] truncate">{{ artist.description }}</td> -->
                                <td class="px-4 py-3">{{ artist.role }}</td>
                            <!-- Actions column -->
                            <td class="px-4 py-3 flex items-center justify-end">
                                <!-- Buttons or actions for each user -->
                                <!-- <EditButton />
                                <PreviewButton /> -->
                                <DeleteButton @clickDelete="OpenDeleteModal(artist)" />
                            </td>
                            </tr>                            

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    <!-- End block -->


<DeleteModal :isDelete=isOpenDeleteModal :user=itemModal @closeModal="toggleDeleteModal" @stateSuccess="displaySuccessDeleteAlert" @stateError=""displayErrorAlert />

</div>



</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import users from '@/assets/data/users.js'
import EditButton from '@/components/toolbox/EditButtonComponent.vue'
import PreviewButton from '@/components/toolbox/PreviewButtonComponent.vue'
import DeleteButton from '@/components/toolbox/DeleteButtonComponent.vue'
import DeleteModal from '@/components/modal/DeleteModal.vue'
import SuccessAlert from '@/components/state/success/SuccessAlert.vue'
import ErrorAlert from '@/components/state/error/ErrorAlert.vue'
import SearchArtist from '@/domain/artist/components/SearchArtist.vue'
import { useStoreArtist } from '../store/store-artist'

const isOpenDeleteModal= ref(false)
const itemModal=ref({})
const isSuccess = ref(false)
const isError = ref(false)
const isSearch = ref(false)
const successMessage = ref('Votre opération est un success')
const errorMessage=ref('Une erreur est survenue')
const storeArtist = useStoreArtist() 

onMounted(() => {
    storeArtist.getAllArtists()
})


const OpenDeleteModal = (item) => {
    itemModal.value = item
    isOpenDeleteModal.value = true
}

const toggleDeleteModal = () => {
    isOpenDeleteModal.value = !isOpenDeleteModal.value
}

const toggleSuccessAlert = () => {
    isSuccess.value = !isSuccess.value
}

const displaySuccessDeleteAlert = async () => {
    isOpenDeleteModal.value=false
    successMessage.value = `${itemModal.value.username} a été retiré`
    await successTimeOut()
}

const displayErrorAlert = async () => {
    isOpenDeleteModal=false
    isError.value=true
    errorMessage.value='Mauvaise requête'
}

const successTimeOut = async () => {
    isSuccess.value = true
    // TODO : ACTIVATE WITH BACK END
    // await store.loadData('inventory')
    setTimeout(() => {
        isSuccess.value=false
    }, 5000)
}

const activateSearch = (isSearchActivated) => {
    if(isSearchActivated){
        isSearch.value = true
    } else {
        isSearch.value = false
    }
}





</script>../store/ArtistStore