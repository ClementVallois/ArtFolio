<template>
    <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing
            <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.startIndex + 1 }}-{{ pagination.endIndex }}</span>
            of
            <span class="font-semibold text-gray-900 dark:text-white">{{ totalItems }}</span>
        </span>
        <ul class="inline-flex items-stretch -space-x-px">
        <!-- Previous Button -->
        <li>
            <a href="#" @click.prevent="prevPage" :disabled="currentPage === 1" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span class="sr-only">Previous</span>
            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            </a>
        </li>
        <!-- Pagination Links -->
        <li v-for="page in totalPages" :key="page">
            <a href="#" @click.prevent="changePage(page)" :class="{ 'text-primary-600 bg-primary-50': page === currentPage, 'text-gray-500 bg-white': page !== currentPage }" class="flex items-center justify-center text-sm py-2 px-3 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{ page }}</a>
        </li>
        <!-- Next Button -->
        <li>
            <a href="#" @click.prevent="nextPage" :disabled="currentPage === totalPages" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span class="sr-only">Next</span>
            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            </a>
        </li>
        </ul>
    </nav>
</template>

<script setup>
import { ref, computed } from 'vue';

const currentPage = ref(1);
const itemsPerPage = 10;
const totalItems = ref(1000); 

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

const pagination = computed(() => {
const startIndex = (currentPage.value - 1) * itemsPerPage;
const endIndex = Math.min(startIndex + itemsPerPage, totalItems.value);
return { startIndex, endIndex };
});

const prevPage = () => {
if (currentPage.value > 1) {
    currentPage.value--;
}
};

const nextPage = () => {
if (currentPage.value < totalPages.value) {
    currentPage.value++;
}
};

const changePage = (page) => {
currentPage.value = page;
};
</script>  