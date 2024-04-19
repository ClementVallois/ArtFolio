<template>
<PageLayout>
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
                        <SearchUser @isSearchActive="activateSearch" />
                    </div>
                    <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <div class="flex items-center space-x-3 w-full md:w-auto">
                            <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                                </svg>
                                Filter
                                <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                            <div id="filterDropdown" class="z-10 hidden w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                                <!-- <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Category</h6>
                                <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                                    <li class="flex items-center">
                                        <input id="user" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                        <label for="user" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">users</label>
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
                            <tr v-if='!isSearch' v-for="(user, index) in users" :key="index" class="border-b dark:border-gray-700">
                                <td scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ user.first_name }}</td>
                                <td class="px-4 py-3">{{ user.last_name }}</td>
                                <td class="px-4 py-3">{{ user.username }}</td>
                                <td class="px-4 py-3">{{ user.birthdate }}</td>
                                <!-- <td class="px-4 py-3 max-w-[12rem] truncate">{{ user.description }}</td> -->
                                <td class="px-4 py-3">{{ user.role }}</td>
                            <!-- Actions column -->
                            <td class="px-4 py-3 flex items-center justify-end">
                                <!-- Buttons or actions for each user -->
                                <!-- <EditButton />
                                <PreviewButton /> -->
                                <DeleteButton @clickDelete="OpenDeleteModal(user)" />
                            </td>
                            </tr>
                            <tr v-else v-for="(user, indexFiltered) in storeuser.userFiltered" :key="indexFiltered" class="border-b dark:border-gray-700">
                                <td scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ user.first_name }}</td>
                                <td class="px-4 py-3">{{ user.last_name }}</td>
                                <td class="px-4 py-3">{{ user.username }}</td>
                                <td class="px-4 py-3">{{ user.birthdate }}</td>
                                <!-- <td class="px-4 py-3 max-w-[12rem] truncate">{{ user.description }}</td> -->
                                <td class="px-4 py-3">{{ user.role }}</td>
                            <!-- Actions column -->
                            <td class="px-4 py-3 flex items-center justify-end">
                                <!-- Buttons or actions for each user -->
                                <!-- <EditButton />
                                <PreviewButton /> -->
                                <DeleteButton @clickDelete="OpenDeleteModal(user)" />
                            </td>
                            </tr>                            

                        </tbody>
                    </table>
                    <p>{{ message }}</p>
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
import PageLayout from '@/components/layout/PageLayout.vue'
import EditButton from '@/components/toolbox/EditButtonComponent.vue'
import PreviewButton from '@/components/toolbox/PreviewButtonComponent.vue'
import DeleteButton from '@/components/toolbox/DeleteButtonComponent.vue'
import DeleteModal from '@/components/modal/DeleteModal.vue'
import SuccessAlert from '@/components/state/success/SuccessAlert.vue'
import ErrorAlert from '@/components/state/error/ErrorAlert.vue'
import SearchUser from '@/domain/user/components/SearchUser.vue'
import { useStoreUser } from '../store/store-user'
import { useAuth0 } from "@auth0/auth0-vue";

const isOpenDeleteModal= ref(false)
const itemModal=ref({})
const isSuccess = ref(false)
const isError = ref(false)
const isSearch = ref(false)
const successMessage = ref('Votre opération est un success')
const errorMessage=ref('Une erreur est survenue')
const storeUser = useStoreUser() 


// const message = ref("");

// const getUsers = async () => {
//   const { getAccessTokenSilently } = useAuth0();
//   const accessToken = await getAccessTokenSilently();
//   const { data, error } = await getProtectedResource(accessToken);

//   if (data) {
//     message.value = JSON.stringify(data, null, 2);
//   }

//   if (error) {
//     message.value = JSON.stringify(error, null, 2);
//   }
// };


// const getProtectedResource = async (accessToken) => {
//   const config = {
//     url: `${apiServerUrl}/post`,
//     method: "GET",
//     headers: {
//       "content-type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//   };

//   const { data, error } = await callExternalApi({ config });

//   return {
//     data: data || null,
//     error,
//   };
// };

onMounted(() => {
    storeUser.getAllUsers()
    // getUsers()
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