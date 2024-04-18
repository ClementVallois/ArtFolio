<template>
<PageLayout>
    <div class="h-[calc(100%-50px)] bg-gray-50 flex flex-col items-center justify-center">
    <!-- Start block -->

    
    <section class="bg-gray-100 py-6 px-4 sm:px-6 lg:px-10 lg:w-[80%]">
    <!-- Alerts -->
    <SuccessAlert v-if="isSuccess" :message="successMessage" @closeAlert="toggleSuccessAlert()"/>
    <ErrorAlert v-if="isError" :message="errorMessage" />        
        
        <div class="max-w-9xl mx-auto">
            <div class="bg-white rounded-lg overflow-hidden">
                <div class="px-6 py-4">
                    <h2 class="text-2xl font-semibold text-gray-800">Artist List</h2>
                </div>
                <div class="px-6 py-4">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-full md:w-1/2">
                            <SearchArtist @isSearchActive="activateSearch" />
                        </div>
                    </div>
                    <div class="overflow-y-auto min-w-full ">
                        <table class="w-full table-auto">
                            <thead>
                                <tr class="bg-gray-800">
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Prénom</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Nom</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Identifiant</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Date de Naissance</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Role</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if='!isSearch' v-for="(artist, index) in storeArtist.artistsAll" :key="index" class="border-b border-gray-400">
                                    <td scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{{ artist.first_name }}</td>
                                    <td class="px-4 py-3">{{ artist.last_name }}</td>
                                    <td class="px-4 py-3">{{ artist.username }}</td>
                                    <td class="px-4 py-3">{{ artist.birthdate }}</td>
                                    <td class="px-4 py-3">{{ artist.role }}</td>
                                    <td class="px-4 py-3 flex items-center justify-end">
                                        <DeleteButton @clickDelete="OpenDeleteModal(artist)" />
                                    </td>
                                </tr>
                                <tr v-else v-for="(artist, indexFiltered) in storeArtist.artistFiltered" :key="indexFiltered" class="border-b dark:border-gray-700">
                                    <td scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{{ artist.first_name }}</td>
                                    <td class="px-4 py-3">{{ artist.last_name }}</td>
                                    <td class="px-4 py-3">{{ artist.username }}</td>
                                    <td class="px-4 py-3">{{ artist.birthdate }}</td>
                                    <td class="px-4 py-3">{{ artist.role }}</td>
                                    <td class="px-4 py-3 flex items-center justify-end">
                                        <DeleteButton @clickDelete="OpenDeleteModal(artist)" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- End block -->


    <DeleteModal :isDelete=isOpenDeleteModal :user=itemModal @closeModal="toggleDeleteModal" @stateSuccess="displaySuccessDeleteAlert" @stateError=""displayErrorAlert />
    </div>

</PageLayout>

</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import users from '@/assets/data/users.js'
import PageLayout from '@/components/layout/PageLayout.vue'
import EditButton from '@/components/toolbox/EditButtonComponent.vue'
import PreviewButton from '@/components/toolbox/PreviewButtonComponent.vue'
import DeleteButton from '@/components/toolbox/DeleteButtonComponent.vue'
import DeleteModal from '@/components/modal/DeleteModal.vue'
import SuccessAlert from '@/components/state/success/SuccessAlert.vue'
import ErrorAlert from '@/components/state/error/ErrorAlert.vue'
import SearchArtist from '@/domain/artist/components/SearchArtist.vue'
import { useStoreArtist } from '../store/ArtistStore'

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
    isOpenDeleteModal.value=false
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


</script>