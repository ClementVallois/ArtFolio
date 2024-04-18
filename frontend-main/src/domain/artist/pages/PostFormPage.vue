<template>
    <div class="w-[90%] m-auto flex flex-col items-center py-[2rem]">
        <SecondTitleComponent title="Création de votre post" ></SecondTitleComponent>
        <form class="w-[100%] mx-auto flex flex-col items-center py-[1rem]">
            <div class="pt-[1rem] flex flex-col items-center w-[100%]">
                <label class="block mb-2 text-[1rem] font-medium text-gray-900" for="user_avatar">Importer votre photo</label>
                <input type="file" class="file-input file-input-bordered w-[90%] text-[0.8rem] lg:w-[40%]" />
            </div>
            <div class="pt-[1rem] flex flex-col items-center w-[100%]">
                <label for="message" class="block mb-2 text-[1rem] font-medium text-gray-900 ">Description</label>
                <textarea class="textarea textarea-bordered h-[20vh] w-[90%] resize-none lg:w-[40%] " placeholder="Bio"></textarea>    
            </div>

            <div class="pt-[2rem] flex justify-center w-full ">
                <ButtonComponent textButton="Poster" class="lg:self-end"></ButtonComponent>
            </div>
        </form>
        
    </div>

</template>

<script setup>
import SecondTitleComponent from '@/components/toolBox/SecondTitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
</script>