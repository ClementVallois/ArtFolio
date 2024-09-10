import { ref, onMounted, onUnmounted } from 'vue';

export default function useClickOutside(elementsRefs, callback) {
    const elements = ref(elementsRefs);

    const handleClickOutside = event => {
        const clickedOutside = elements.value.every(element => {
            return element.value && !element.value.contains(event.target);
        });

        if (clickedOutside) {
            callback();
        }
    };

    onMounted(() => {
        document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside);
    });

    return {
        elements,
    };
}