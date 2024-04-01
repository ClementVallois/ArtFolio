<template>
    <TitleComponent title="Artiste"> </TitleComponent>
    <div>
        User {{ id }}
    </div>
</template>

<script setup>

import TitleComponent from '@/components/toolBox/TitleComponent.vue';




defineProps({
    id: String
})
</script>