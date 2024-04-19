<template>
    <div class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div class="bg-white w-[90%] max-w-lg p-8 rounded-lg relative z-[4]">
            
            <div class="bg-white rounded-t-lg mb-4">
                <SecondTitleComponent title="Création de votre post"></SecondTitleComponent>
        
                <!-- Croix pour fermer la modal -->
                <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <form class="mt-8 flex flex-col items-center">
            <div class="mb-4 w-full">
                <label for="user_avatar" class="block mb-2 text-[1rem] font-medium text-gray-900">Importer votre photo</label>
                <input type="file" class="file-input file-input-bordered w-full text-sm" />
            </div>
    
            <div class="mb-4 w-full">
                <label for="message" class="block mb-2 text-[1rem] font-medium text-gray-900">Description</label>
                <textarea class="textarea textarea-bordered h-24 w-full resize-none" placeholder="Bio"></textarea>
            </div>
            <div class="flex justify-end w-full">
                <ButtonComponent textButton="Poster" class="lg:self-end"></ButtonComponent>
            </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import SecondTitleComponent from '@/components/toolBox/SecondTitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
</script>