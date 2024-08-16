<template>
    <table class="w-full table-auto">
        <thead>
            <tr class="bg-gray-800">
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Identifiant
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Nom</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Prénom</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Statut de la
                    demande</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Action</th>
            </tr>
        </thead>
        <BodyTablePersonalDataRequestComponent v-if="params.isSearch == false"
            :personalDataRequest="params.personalDataRequest" @emitOpenProcessModal="emitOpenProcessModal" />
        <BodyTablePersonalDataRequestComponent v-else :personalDataRequest="params.personalDataRequestsFiltered"
            @emitOpenProcessModal="emitOpenProcessModal" />
    </table>
</template>

<script setup>
import BodyTablePersonalDataRequestComponent from './BodyTablePersonalDataRequestComponent.vue';

const params = defineProps(['isSearch', 'personalDataRequest', 'personalDataRequestsFiltered'])
const emits = defineEmits(['openProcessModal'])

const emitOpenProcessModal = (item) => {
    emits('openProcessModal', item)
}

</script>