<template>
    <tbody>
        <tr v-for="(dataRequest, index) in params.personalDataRequest" :key="index" class="border-b border-gray-400">
            <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{{ dataRequest.id }}</td>
            <td class="px-4 py-3">{{ dataRequest.user.lastName }}</td>
            <td class="px-4 py-3">{{ dataRequest.user.firstName }}</td>
            <td class="px-4 py-3">{{ dataRequest.status }}</td>
            <td class="px-4 py-3">{{ formatDate(dataRequest.createdAt) }}</td>
            <td class="px-4 py-3 flex items-center justify-end">
                <ProcessButton @clickProcess="emitOpenProcessModal(dataRequest)" />
            </td>
        </tr>
    </tbody>
</template>

<script setup>
import ProcessButton from '@/components/toolbox/ProcessButtonComponent.vue';

const params = defineProps(['personalDataRequest'])
const emits = defineEmits(['emitOpenProcessModal'])

const emitOpenProcessModal = (dataRequest) => {
    console.log('emitOpenProcessModal', dataRequest); // Add this line for debugging
    emits('emitOpenProcessModal', dataRequest)
}

const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
</script>