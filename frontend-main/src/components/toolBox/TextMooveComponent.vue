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
import { categoriesStore } from '@/domain/artist/store/categoriesStore';
const { getAllCategoriesName } = categoriesStore();
const allCategoriesNamesData = getAllCategoriesName();



const speed = 3500;
const words = allCategoriesNamesData;
console.log(words);
const n = ref(0);
const currentWordIndex = ref(0);
const currentWord = computed(() => words[n.value % words.length]);

const cycleWords = () => {
    setInterval(() => {
        n.value = (n.value + 1) % words.length;
        currentWordIndex.value++;
    }, speed);
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
</style>