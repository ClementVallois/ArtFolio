<template>
    <!-- Backdrop -->
    <div v-show="showModal == true" @click="closeModal" class="fixed z-10 inset-0 bg-gray-800 bg-opacity-50"></div>

    <!-- Modal -->
    <div v-show="showModal == true"
        class="fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-8 dark:bg-gray-800">
        <!-- Modal content -->
        <div class="relative p-1 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-4 dark:bg-gray-800">
            <button type="button"
                class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                @click="closeModal">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path fill="#1C274C" fill-rule="evenodd"
                        d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Zm10-5.75a.75.75 0 0 1 .75.75v5.19l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72V7a.75.75 0 0 1 .75-.75Zm-4 10a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5H8Z"
                        clip-rule="evenodd" />
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <i class="fa-solid fa-download text-gray-400 dark:text-gray-500 text-2xl mb-3.5 mx-auto"></i>
            <p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to download {{
                props.personalDataRequest.id }}?</p>
            <div class="flex justify-center items-center space-x-4">
                <button @click="closeModal" type="button"
                    class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No,
                    cancel</button>
                <button type="submit" @click="downloadItem"
                    class="py-2 px-3 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-900">
                    Yes, I'm sure
                </button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useStorePersonalDataRequest } from '@/domain/personal-data-request/store/PersonalDataRequestStore';
import { ref, watch } from 'vue';


const store = useStorePersonalDataRequest();
const props = defineProps(['isProcess', 'personalDataRequest']);
const emit = defineEmits(['closeModal', 'stateError', 'stateSuccess']);

const showModal = ref(false);

watch(() => props.isProcess, (newValue) => {
    showModal.value = newValue;
});

function closeModal() {
    showModal.value = false;
    emit('closeModal')
}

const downloadItem = async () => {
    console.log('downloadItem', props.personalDataRequest);
    try {
        if (props.personalDataRequest && props.personalDataRequest.id) {
            const response = await store.downloadPersonalDataRequest(props.personalDataRequest.id)

            if (response && response.data) {
                const contentDisposition = response.headers['content-disposition'];
                const filenameMatch = contentDisposition && contentDisposition.match(/filename="?(.+)"?/);
                const filename = filenameMatch ? filenameMatch[1] : `user-data-${props.personalDataRequest.id}.json`;

                const blob = new Blob([response.data], { type: 'application/json' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();

                window.URL.revokeObjectURL(url);
                link.remove();

                emit('stateSuccess');
                emit('processedItem', props.personalDataRequest.id); // Emit the processed item ID
            } else {
                throw new Error('Invalid response data');
            }
        } else {
            throw new Error('Invalid personal data request');
        }
    } catch (error) {
        console.error('Error downloading item:', error);
        emit('stateError');
    }
}
</script>