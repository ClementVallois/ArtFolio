<template>
<PageLayout>
    <div class="h-[calc(100%-50px)] bg-gray-50 flex flex-col items-center justify-center">

    <section class="bg-gray-100 py-6 px-4 sm:px-6 lg:px-10 lg:w-full">
    <!-- Alerts -->
    <SuccessAlert v-if="isSuccess" :message="successMessage" @closeAlert="toggleSuccessAlert()"/>
    <ErrorAlert v-if="isError" :message="errorMessage" />
    <div class="max-w-9xl mx-auto">
            <div class="bg-white rounded-lg overflow-hidden">
                <div class="px-6 py-4">
                    <h2 class="text-2xl font-semibold text-gray-800">User List</h2>
                </div>
                <div class="px-6 py-4">
                    <div class="flex items-center justify-between mb-4">
                    <div class="w-full md:w-1/2">
                        <SearchUser @isSearchActive="activateSearch" />
                    </div>
                </div>
                <div class="overflow-y-auto min-w-full max-h-[calc(100vh-12rem)] sm:max-h-[calc(100vh-14rem)] md:max-h-[calc(100vh-16rem)] lg:max-h-[calc(100vh-18rem)] xl:max-h-[calc(100vh-20rem)]">
                    <ListUserTableComponent :isSearch="isSearch" :users="storeUser.usersAll" :usersFiltered="storeUser.usersFiltered" @openDeleteModal="openDeleteModal"/>
                </div>
            </div>
        </div>
    </div>
    </section>
    <!-- End block -->


<DeleteModal :isDelete=isOpenDeleteModal :user=itemModal @closeModal="toggleDeleteModal" @stateSuccess="displaySuccessDeleteAlert" @stateError="displayErrorAlert" />

</div>

</PageLayout>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import DeleteModal from '@/components/modal/DeleteModal.vue'
import SuccessAlert from '@/components/state/success/SuccessAlert.vue'
import ErrorAlert from '@/components/state/error/ErrorAlert.vue'
import SearchUser from '@/domain/user/components/SearchUser.vue'
import ListUserTableComponent from '@/components/table/ListUserTableComponent.vue'
import { useStoreUser } from '../store/UserStore.js'

const isOpenDeleteModal= ref(false)
const itemModal=ref({})
const isSuccess = ref(false)
const isError = ref(false)
const isSearch = ref(false)
const successMessage = ref('Votre opération est un success')
const errorMessage=ref('Une erreur est survenue')
const storeUser = useStoreUser() 


onMounted(async() => {
    console.log('onMounted')
    await storeUser.getAllUsers()
})


const openDeleteModal = (item) => {
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

</script>../store/UserStore