import { defineStore } from 'pinia'
import users from '@/assets/data/users.js'
import { ref, toRaw } from 'vue'

export const useStoreArtist = defineStore('storeArtist', () => {


const artistsAll = ref([])
const artistFiltered = ref([])


function getAllArtists() {
    const role = 'artist'; // Your desired role
    artistsAll.value= users.filter(user => user.role === role);
    console.log(artistsAll)
}


//TODO : Modify here with the API 
function filterDataArtist(searchInput) {
    
    if (searchInput.value !== '' && searchInput.value !== null) {
        // Construct the regex pattern to match search input in first_name and last_name fields case insensitive
        const regex = new RegExp(searchInput.value, 'i');

        // Extract the Raw value of the reactive object         
        const artistsAllRaw = toRaw(artistsAll.value)

        // Filter the array of artist objects based on first_name or last_name matching the search input
        artistFiltered.value = artistsAllRaw.filter(artist => {
            return regex.test(artist.first_name) || regex.test(artist.last_name);
        })
    } else {
        // Reset artistFiltered if searchInput is empty or null
        artistFiltered.value = [];
    }
}



return {
    artistsAll,
    artistFiltered,
    getAllArtists,
    filterDataArtist
}
})
