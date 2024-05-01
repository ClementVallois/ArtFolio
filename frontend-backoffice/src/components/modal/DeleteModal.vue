<template>
    <!-- Backdrop -->
    <div v-show="showModal == true" @click="closeModal" class="fixed z-10 inset-0 bg-gray-800 bg-opacity-50"></div>

    <!-- Modal -->
    <div  v-show="showModal == true" class="fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-8 dark:bg-gray-800">
        <!-- Modal content -->
        <div class="relative p-1 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-4 dark:bg-gray-800">
                <button type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" @click="closeModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <i class="fa-solid fa-trash text-gray-400 dark:text-gray-500 text-2xl mb-3.5 mx-auto"></i>
                <p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to remove {{ params.user.firstName + ' ' + params.user.lastName}}?</p>
                <div class="flex justify-center items-center space-x-4">
                    <button @click="closeModal" type="button" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                    <button type="submit" @click="deleteItem(userDelete.id)" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Yes, I'm sure</button>
                </div>
            </div>
    </div>
</template>


<script setup>
import { ref, watch } from 'vue';
import { useGlobalStore } from '@/stores/store'
import { CRUDAuth0API } from '@/domain/auth0/api/CRUDAuth0API';
import { CRUDapi } from '@/api/CrudApi'

const store = useGlobalStore();
const params = defineProps(['isDelete', 'user']);
const emit = defineEmits(['closeModal','stateError', 'stateSuccess']);
const showModal = ref(false);
const userDelete = ref({
    id: '',
})

watch(() => params.isDelete, (newValue, oldValue) => {
    showModal.value = newValue;
});

watch(() => params.item, (newValue, oldValue) => {
    userDelete.value = {...newValue};
});

function closeModal() {
    showModal.value = false;
    emit('closeModal')
}

const deleteItem = async(user) => {
    try {
        await CRUDAuth0API('DELETE', `users/${user.auth0Id}`)
        await CRUDapi('DELETE', `users/${user.id}`)
        emit('stateSuccess')
    } catch (error) {
        emit('stateError')
    }
}

</script>

