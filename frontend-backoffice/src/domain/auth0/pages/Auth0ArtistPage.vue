<template>
<PageLayout>
    <div class="h-[calc(100%-50px)] bg-gray-50 flex flex-col items-center justify-center">
        
        <div v-if="users == null" class="justify-center items-center flex-col flex">
            <button  @click="getAllUsers" class="bg-gray-800 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300">Get All users From Auth0</button>
            <p class="mt-2">💣  Sois prêt ça va être de la BOMBE 💣 ! </p>
        </div>
        <div v-if="users !=null">
            <div class="my-3">
                <p class="text-center text-xl"> 😱 Mais wow wow WOW  !!!!!!!! 😱</p>
                <p>Tu t'es connecté à l'API de Auth0 avec ton token !!!!</p>
            </div>
            <h2 class="text-2xl font-bold mb-4">User Information</h2>
            <div v-for="(userFields, index) in formattedUsers" :key="index" class="mb-6">
            <h3 class="text-lg font-semibold mb-2">{{ `User ${index + 1}` }}</h3>
            <div class="overflow-x-auto">
                <table class="table-auto min-w-full">
                <thead>
                    <tr class="bg-gray-200">
                    <th class="px-4 py-2">Attribute</th>
                    <th class="px-4 py-2">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(value, attribute) in userFields" :key="attribute">
                    <td class="border px-4 py-2">{{ attribute }}</td>
                    <td class="border px-4 py-2">{{ value }}</td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
        </div>
    </div>
</PageLayout>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import auth0ManagementApi from '../api/Auth0ManagementAPI'
import PageLayout from '@/components/layout/PageLayout.vue';

const users = ref(null)

onMounted(() => {

const response = auth0ManagementApi.get('https://dev-03ri6j5f0csn4op2.eu.auth0.com/api/v2/clients')
console.log(response)

})

const getAllUsers = async () => {
    const response = await auth0ManagementApi.get('https://dev-03ri6j5f0csn4op2.eu.auth0.com/api/v2/users')
    console.log(response)
    users.value = response.data
}

// Computed property to format users data
const formattedUsers = computed(() => {
  return users.value.map(user => ({
    Email: user.email,
    "Email Verified": user.email_verified ? 'Yes' : 'No',
    "Last Login": new Date(user.last_login).toLocaleString(),
    "Logins Count": user.logins_count,
    // Add more fields as needed
  }));
});


</script>