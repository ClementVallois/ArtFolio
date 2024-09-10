<template>
    <PageLayout>
      <div class="h-[calc(100%-50px)] bg-white flex flex-col items-center justify-center">
            <div v-if="isAuthenticated" class="user-profile">
                <div class="profile-picture">
                    <img :src="user.picture" :alt="user.name" class="rounded-full h-24 w-24 object-cover">
                </div>
                <div class="profile-details mt-4">
                    <p class="font-bold text-xl">{{ user.name }}</p>
                    <p class="text-gray-800">Auth0_id: <code class="text-gray-600 italic">{{ user.sub }}</code></p>
                    <p>{{ user.email }}</p>
                    <p v-if="user.email_verified" class="text-green-500">Email Verified</p>
                    <p v-else class="text-red-500">Email Not Verified</p>
                    <p class="text-gray-600">Updated at: {{ formatDate(user.updated_at) }}</p>
                    <button class="mt-4 px-3 py-1.5 bg-gray-800 text-white rounded hover:bg-gray-700 text-sm" @click="redirectToAuth0">Update your profile</button>
                </div>
            </div>
        </div>
    </PageLayout>
</template>

<script setup>
//AUTH0 REACTIVATE
import { useAuth0 } from "@auth0/auth0-vue";

import PageLayout from "../components/layout/PageLayout.vue";

//AUTH0 REACTIVATE
const { user, isAuthenticated } = useAuth0();
const code = user ? JSON.stringify(user.value, null, 2) : "";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
};

const redirectToAuth0 = () => {
    const url = 'https://auth0.auth0.com/u/login/identifier?state=hKFo2SBiUzc4VTRYc0taVF9felFfWHEwazBOWHRncWVfWUtqeqFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIFVEWlJxdzI4U2ZDdHZOaXZJUUd3end3d0tKOFZXZlBVo2NpZNkgekVZZnBvRnpVTUV6aWxoa0hpbGNXb05rckZmSjNoQUk'; // Replace with your desired URL
        window.open(url, '_blank');
}


</script>