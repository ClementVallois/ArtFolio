<template>
    <div class="wrapper">
        <div ref="textWrapper" class="text-wrapper" :key="`word-${currentWordIndex}`">
            <div class="word">
                <span v-for="(letter, index) in currentWord.split('')" :key="`letter-${currentWordIndex}-${index}`"
                    class="letter" :style="getLetterStyle(index)">
                    {{ letter.trim() === '' ? '\xa0' : letter }}
                </span>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';

import { categorieStore } from '@/domain/artist/store/categorieStore';
const categoryStore = categorieStore();
const wordss = categoryStore.getAllCategoriesName;



const speed = 3500;
const n = ref(0);
const currentWordIndex = ref(0);
const currentWord = computed(() => {
    const words = categoryStore.getAllCategoriesName;
    return words.length > 0 ? words[n.value % words.length] : "";
});

const cycleWords = () => {
    if (categoryStore.getAllCategoriesName.length > 0) {
        setInterval(() => {
            n.value = (n.value + 1) % categoryStore.getAllCategoriesName.length;
            currentWordIndex.value++;
        }, speed);
    }
};

const getLetterStyle = (index) => {
    const delay = index * 0.1;
    return {
        animationDelay: `${delay}s`
    };
};

onMounted(() => {
    cycleWords();
});
</script>

<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.word {
    display: inline-block;
    overflow: hidden;
}

.letter {
    display: inline-block;
    opacity: 0;
    transform: translateY(100%);
    animation: letter-rise 0.5s forwards;
}

@keyframes letter-rise {
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>@/domain/artist/store/categorieStore