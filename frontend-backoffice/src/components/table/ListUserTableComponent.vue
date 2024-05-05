<template>
    <table class="w-full table-auto">
        <thead>
            <tr class="bg-gray-800">
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Prénom</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Nom</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Identifiant</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Date de Naissance</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Role</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Action</th>
            </tr>
        </thead>
            <BodyTableUserComponent v-if="params.isSearch == false" :users="params.users" @emitOpenDeleteModal="emitOpenDeleteModal" />
            <BodyTableUserComponent v-else :users="params.usersFiltered" @emitOpenDeleteModal="emitOpenDeleteModal" />
    </table>
</template>

<script setup>
import { useStoreArtist } from '@/domain/artist/store/ArtistStore'
import BodyTableUserComponent from './BodyTableUserComponent.vue'

const params = defineProps(['isSearch', 'users', 'usersFiltered'])
const emits = defineEmits(['openDeleteModal'])

const emitOpenDeleteModal = (item) => {
    emits('openDeleteModal', item)
}

</script>