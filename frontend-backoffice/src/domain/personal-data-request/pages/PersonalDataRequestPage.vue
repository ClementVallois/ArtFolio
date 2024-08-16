<template>
    <PageLayout>
        <div class="h-[calc(100%-50px)] bg-gray-50 flex flex-col items-center justify-center">
            <section class="bg-gray-100 py-6 px-4 sm:px-6 lg:px-10 lg:w-full">
                <!-- Alerts -->
                <SuccessAlert v-if="isSuccess" :message="successMessage" @closeAlert="toggleSuccessAlert()" />
                <ErrorAlert v-if="isError" :message="errorMessage" />
                <div class="max-w-9xl mx-auto">
                    <div class="bg-white rounded-lg overflow-hidden">
                        <div class="px-6 py-4">
                            <h2 class="text-2xl font-semibold text-gray-800">Personal Data Requests List</h2>
                        </div>
                        <div class="px-6 py-4">
                            <div class="flex items-center justify-between mb-4">
                                <div class="w-full md:w-1/2">
                                    <SearchRequestedPersonalDataRequest @isSearchActive="activateSearch" />
                                </div>
                            </div>
                            <div
                                class="overflow-y-auto min-w-full max-h-[calc(100vh-12rem)] sm:max-h-[calc(100vh-14rem)] md:max-h-[calc(100vh-16rem)] lg:max-h-[calc(100vh-18rem)] xl:max-h-[calc(100vh-20rem)]">
                                <ListPersonalDataRequestTableComponent :isSearch="isSearch"
                                    :personalDataRequest="storePersonalDataRequest.allRequestedPersonalDataRequests"
                                    :personalDataRequestsFiltered="storePersonalDataRequest.personalDataRequestsFiltered"
                                    @openProcessModal="openProcessModal" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ProcessModal :isProcess="isOpenProcessModal" :personalDataRequest="itemModal"
                @closeModal="toggleProcessModal" @stateSuccess="displaySuccessDownloadAlert"
                @stateError="displayErrorAlert" />
        </div>
    </PageLayout>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStorePersonalDataRequest } from '../store/PersonalDataRequestStore';
import PageLayout from '@/components/layout/PageLayout.vue';
import ListPersonalDataRequestTableComponent from '@/components/table/ListPersonalDataRequestTableComponent.vue';
import SuccessAlert from '@/components/state/success/SuccessAlert.vue';
import ErrorAlert from '@/components/state/error/ErrorAlert.vue';
import ProcessModal from '@/components/modal/ProcessModal.vue';
import SearchRequestedPersonalDataRequest from '../components/SearchRequestedPersonalDataRequest.vue';

const isOpenProcessModal = ref(false)
const isSuccess = ref(false)
const isError = ref(false)
const isSearch = ref(false)
const itemModal = ref({})
const successMessage = ref('Votre opération est un success')
const errorMessage = ref('Une erreur est survenue')
const storePersonalDataRequest = useStorePersonalDataRequest()

onMounted(async () => {
    await storePersonalDataRequest.getAllRequestedPersonalDataRequests()
})

const openProcessModal = (item) => {
    console.log('openProcessModal', item); // Add this line for debugging
    itemModal.value = item;
    isOpenProcessModal.value = true;
}

const toggleSuccessAlert = () => {
    isSuccess.value = !isSuccess.value
}

const toggleProcessModal = () => {
    isOpenProcessModal.value = !isOpenProcessModal.value
}


const displaySuccessDownloadAlert = async () => {
    isOpenProcessModal.value = false
    successMessage.value = `${itemModal.value.id} a été téléchargé`
    await successTimeOut()
}

const displayErrorAlert = async () => {
    isOpenProcessModal.value = false
    isError.value = true
    errorMessage.value = 'Mauvaise requête'
}

const successTimeOut = async () => {
    isSuccess.value = true
    // TODO : ACTIVATE WITH BACK END
    // await store.loadData('inventory')
    setTimeout(() => {
        isSuccess.value = false
    }, 5000)
}
const activateSearch = (isSearchActivated) => {
    if (isSearchActivated) {
        isSearch.value = true
    } else {
        isSearch.value = false
    }
}

</script>