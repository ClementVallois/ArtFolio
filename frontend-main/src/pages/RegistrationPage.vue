<template>
        <section class="border-l-4 border-black  ml-3rem] lg:ml-[4rem] lg:h-[92vh] flex flex-col justify-center">
            <TitleComponent title="Vous voulez vous inscrire ? " class="text-[3rem] lg:text-[4rem] mt-[3rem]"> </TitleComponent>
        
            <div class="mt-[4rem]  ml-[2rem] mr-[1rem] lg:mr-[2rem]">    
                <SecondTitleComponent title="Vous êtes un artiste " ></SecondTitleComponent>
                <div>Plasticien, Graveur, ou tout autre créateur artistique, vous souhaitez partager votre art avec une communauté solide, élargir votre audience et échanger avec d'autres passionnés d'art. Rejoignez-nous sur ArtFolio et créez votre profil artiste dès aujourd'hui pour présenter votre travail, votre biographie, vos influences et vos projets en cours</div>
                <router-link :to="{ name: 'ArtistPreRegistrationPage' }" class="text-gray-800 text-sm  md:mx-4">
                    <ButtonComponent textButton="S'inscrire" class="lg:self-end mt-[1rem]"></ButtonComponent>
                </router-link>
            </div>
            <div class="mt-[4rem]  ml-[2rem] mr-[1rem] lg:mr-[2rem]">    
                <SecondTitleComponent title="Vous êtes un utilisateur " ></SecondTitleComponent>
                <div>Amateur d'art, simple curieux, curateur ou collectionneur, vous souhaitez avoir accès à l'intégralité du panel d'artistes,découvrir de nouvelles œuvres et interagir avec eux. Inscrivez-vous sur ArtFolio dèsmaintenant pour accéder à une variété d'œuvres d'art, explorer les profils des artistes et entrer en contact avec la communauté artistique.</div>
                <router-link :to="{ name: 'UserRegistrationPage' }" class="text-gray-800 text-sm  md:mx-4">
                    <ButtonComponent textButton="S'inscrire" class="lg:self-end my-[1rem]"></ButtonComponent>
                </router-link>
            </div>
        
            </section>


</template>

<script setup>
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import SecondTitleComponent from '@/components/toolBox/SecondTitleComponent.vue';
import ButtonComponent from '@/components/toolBox/ButtonComponent.vue';
</script>