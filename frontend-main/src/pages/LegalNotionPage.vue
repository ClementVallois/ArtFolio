<template>

    <section class="border-l-4 border-black ml-[4rem]">
        <TitleComponent title="Mention Légale" class="text-[3rem] lg:text-[4rem] mt-[3rem]"> </TitleComponent>

        <SecondTitleComponent title="Informations légales" class="mt-[4rem]  ml-[2rem] "></SecondTitleComponent>
        <p class="m-[2rem]">
            ArtFolio est une plateforme en ligne exploitée par ArtCollectif. Notre siège social est situé à Paris.
        </p>

        <SecondTitleComponent title="Propriété intellectuelle" class="mt-[1.5rem]  ml-[2rem] "></SecondTitleComponent>
        <p class="m-[2rem]">
            Tous les contenus présents sur ArtFolio, y compris mais sans s'y limiter, les textes, les images, les
            vidéos,
            les logos, les marques de commerce et les œuvres d'art, sont la propriété intellectuelle de ArtFolio ou
            de
            ses
            concédants de licence, et sont protégés par les lois sur le droit d'auteur et les autres
            lois applicables en matière de propriété intellectuelle.
            Toute utilisation non autorisée de ces contenus est strictement interdite et peut entraîner des
            poursuites
            judiciaires.
        </p>

        <SecondTitleComponent title="Responsabilité" class="mt-[1.5rem]  ml-[2rem] "></SecondTitleComponent>
        <p class="m-[2rem]">
            Nous nous efforçons de fournir des informations précises et à jour sur ArtFolio, mais nous ne pouvons
            garantir l'exactitude, l'exhaustivité ou la pertinence de ces informations. En conséquence, nous
            déclinons
            toute
            responsabilité en cas de préjudice résultant de l'utilisation ou de la confiance accordée à ces
            informations.
        </p>

        <SecondTitleComponent title="Liens externes" class="mt-[1.5rem]  ml-[2rem] "></SecondTitleComponent>
        <p class="m-[2rem]">
            ArtFolio peut contenir des liens vers des sites Web externes qui ne sont pas sous notre contrôle. Nous
            déclinons toute responsabilité quant au contenu de ces sites Web externes et quant aux conséquences de
            leur
            utilisation.
        </p>

        <SecondTitleComponent title="Protection des données personnelles" class="mt-[1.5rem]  ml-[2rem] ">
        </SecondTitleComponent>
        <p class="m-[2rem]">
            Nous respectons la vie privée de nos utilisateurs et nous nous engageons à protéger leurs données
            personnelles
            conformément à notre politique de confidentialité. En utilisant ArtFolio, vous consentez à la collecte,
            à
            l'utilisation et à la divulgation de vos données personnelles telles que décrites dans ladite politique.
        </p>

        <SecondTitleComponent title="Modification des mentions légales" class="mt-[1.5rem]  ml-[2rem] "></SecondTitleComponent>
        <p class="m-[2rem]">
            Nous nous réservons le droit de modifier ces mentions légales à tout moment et sans préavis. Il est de
            votre
            responsabilité de consulter régulièrement cette page pour prendre connaissance des éventuelles
            modifications.
        </p>
    </section>

</template>

<script setup>
import TitleComponent from '@/components/toolBox/TitleComponent.vue';
import SecondTitleComponent from '@/components/toolBox/SecondTitleComponent.vue';
</script>