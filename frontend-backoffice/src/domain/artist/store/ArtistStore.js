import { defineStore } from 'pinia'
import users from '@/assets/data/users.js'
import { ref, toRaw } from 'vue'
import { artistApi } from '@/domain/artist/api/ArtistRemoteDataSource';
import User from '@/model/UserModel';


export const useStoreArtist = defineStore('storeArtist', () => {


const artistsAll = ref([])
const artistFiltered = ref([])

//Static Data Source
// function getAllArtists() {
//     const role = 'artist'; // Your desired role
//     artistsAll.value= users.filter(user => user.role === role);
// }


async function getAllArtists() {
    try {
        const response = await artistApi().getAllArtists();
        if (Array.isArray(response)) {
            artistsAll.value = response.map(jsonUser => User.fromJson(jsonUser))
            return response.map(jsonUser => User.fromJson(jsonUser));
        } else {
            console.error("La réponse n'est pas un tableau d'objets JSON :", response);
            return [];
        }
    } catch (error) {
        console.log(error);
        console.error("Erreur lors de la récupération des artistes:", error);
    }
}

function filterDataArtist(searchInput) {
    if (searchInput.value !== '' && searchInput.value !== null) {
        // Construct the regex pattern to match search input in first_name and last_name fields case insensitive
        const regex = new RegExp(searchInput.value, 'i');

        // Extract the Raw value of the reactive object         
        const artistsAllRaw = toRaw(artistsAll.value)

        // Filter the array of artist objects based on first_name or last_name matching the search input
        artistFiltered.value = artistsAllRaw.filter(artist => {
            return regex.test(artist.firstName) || regex.test(artist.lastName);
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
