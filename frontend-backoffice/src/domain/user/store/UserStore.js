import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import { userService } from '../service/UserService.js'

export const useStoreUser = defineStore('storeUser', () => {

const usersAll = ref([])
const usersFiltered = ref([])


async function getAllUsers() {
    try {
        const response = await userService().getAllUsers()
        usersAll.value=response
    } catch (error) {
        return error
    }
}


//TODO : Modify here with the API 
function filterDataUser(searchInput) {
    
    if (searchInput.value !== '' && searchInput.value !== null) {
        // Construct the regex pattern to match search input in first_name and last_name fields case insensitive
        const regex = new RegExp(searchInput.value, 'i');

        // Extract the Raw value of the reactive object         
        const userAllRaw = toRaw(usersAll.value)

        // Filter the array of artist objects based on first_name or last_name matching the search input
        usersFiltered.value = userAllRaw.filter(user => {
            return regex.test(user.firstName) || regex.test(user.lastName);
        })
    } else {
        // Reset artistFiltered if searchInput is empty or null
        usersFiltered.value = [];
    }
}



return {
    usersAll,
    usersFiltered,
    getAllUsers,
    filterDataUser
}


})
