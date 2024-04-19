<template>
    <TitleComponent title="Je suis un artiste" class="text-[3rem] lg:text-[4rem] mt-[3rem]"> </TitleComponent>

    <form id="artistForm" @submit.prevent="submitForm"  class="flex flex-col items-center w-[100vw] pb-[1rem] pt-[2rem]">
        <div class="flex flex-col w-[90vw] pb-[1rem]">
            <label for=""> Votre photo de profil</label>
            <input name="assetName"  type="file" required class="file-input file-input-bordered text-[0.8rem]  w-full max-w-xs " />
        </div>
        <div class="flex flex-col w-[90vw] pb-[1rem]">
            <label for=""> Votre nom d'utilisateur</label>
            <input v-model="username" placeholder="john.doe" type="text" required class="input input-bordered w-full max-w-xs" />
        </div>
        <div class="flex flex-col w-[90vw] pb-[1rem]">
            <label for=""> Votre prénom</label>
            <input v-model="firstName" placeholder="John" type="text" required  class="input input-bordered w-full max-w-xs" />
        </div>
            <div class="flex flex-col w-[90vw] pb-[1rem]">
            <label for=""> Votre nom</label>
            <input v-model="lastName" placeholder="Doe" type="text"  required class="input input-bordered w-full max-w-xs" />
        </div>
    
        <div class="flex flex-col w-[90vw] pb-[1rem]">
            <label for=""> Votre date de naissance</label>
            <input v-model="birthDate" type="date" required  class="input input-bordered w-full max-w-xs lg:w-[40%]" />
        </div>

    </form>
    <div class="flex flex-col w-[90vw] pb-[1rem]">
        <ButtonComponent type="submit"  textButton="S'enregistrer" class="w-[30vw] lg:self-end lg:w-[10vw]"></ButtonComponent>
    </div>
</template>

<script setup>
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
import { ref } from 'vue'

const username = ref('');
const firstName = ref('');
const lastName = ref('');
const birthDate = ref('');


</script>

