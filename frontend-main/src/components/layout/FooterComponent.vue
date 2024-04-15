<template>
    <div class="bg-black flex flex-col items-center justify-center px-[2rem] pt-[4rem] md:h-[40vh] md:px-[10rem]">
        <div class="max-w-[1780px] w-full md:flex md:justify-around">
            <img src="@/assets/img/artfolio_logo.png" class="max-h-48">
            <hr class="md:hidden border-t border-gray-200 my-4 w-full">
            <div class="w-full text-slate-200 flex justify-around pb-[4rem] md:flex-col md:justify-center md:items-end">
                <!-- TODO: mettre les bon liens -->
                <CustomLinkComponent :to="{ name: 'about' }" text="A propos" class="text-slate-200" />
                <CustomLinkComponent :to="{ name: 'artist' }" text="Vos droits" class="text-slate-200" />
                <CustomLinkComponent :to="{ name: 'artist' }" text="Mention Légale" class="text-slate-200" />
            </div>
        </div>
        <div class="text-slate-200 text-base md:self-end">ArtFolio - ©2024</div>
    </div>
</template>

<script setup>
import CustomLinkComponent from '@/components/toolBox/CustomLinkComponent.vue';
</script>