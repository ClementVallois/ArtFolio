import { defineStore } from 'pinia'
import users from '@/assets/data/users.js'
import { ref } from 'vue'

export const useStoreUser = defineStore('storeUser', () => {

const usersAll = ref([])
const userFiltered = ref([])


function getAllUsers() {
    const role = 'user'; // Your desired role
    usersAll.value= users.filter(user => user.role === role);
}


//TODO : Modify here with the API 
function filterDataUser(searchInput) {
    
    if (searchInput.value !== '' && searchInput.value !== null) {
        // Construct the regex pattern to match search input in first_name and last_name fields case insensitive
        const regex = new RegExp(searchInput.value, 'i');

        // Extract the Raw value of the reactive object         
        const userAllRaw = toRaw(usersAll.value)

        // Filter the array of artist objects based on first_name or last_name matching the search input
        userFiltered.value = userAllRaw.filter(user => {
            return regex.test(user.first_name) || regex.test(user.last_name);
        })
    } else {
        // Reset artistFiltered if searchInput is empty or null
        userFiltered.value = [];
    }
}



return {
    usersAll,
    userFiltered,
    getAllUsers,
    filterDataUser
}



return {
    user
}
})
