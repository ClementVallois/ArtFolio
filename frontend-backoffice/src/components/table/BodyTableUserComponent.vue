<template>
    <tbody>
        <tr v-for="(artist, index) in params.users" :key="index" class="border-b border-gray-400">
            <td scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{{ artist.firstName }}</td>
            <td class="px-4 py-3">{{ artist.lastName }}</td>
            <td class="px-4 py-3">{{ artist.username }}</td>
            <td class="px-4 py-3">{{ artist.birthDate }}</td>
            <td class="px-4 py-3">{{ artist.role }}</td>
            <td class="px-4 py-3 flex items-center justify-end">
                <DeleteButton @clickDelete="emitOpenDeleteModal(artist)" />
            </td>
        </tr>
    </tbody>
</template>

<script setup>
import DeleteButton from '@/components/toolbox/DeleteButtonComponent.vue'

const params = defineProps(['users'])
const emits = defineEmits(['emitOpenDeleteModal'])

const emitOpenDeleteModal = (item) => {
    emits('emitOpenDeleteModal', item)
}

</script>