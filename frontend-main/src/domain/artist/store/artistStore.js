import { defineStore } from 'pinia';
import { artistService } from '@/domain/artist/service/ArtistService.js';
import { ref } from 'vue';


/////////
///// Artist Store
/////////
export const useStoreArtist = defineStore('artistStore', () => {

    const allArtistData = ref([]);
    const artist = ref([]);
    const artistId = ref(null);
    const artistPosts = ref([]);
    const lastRegisteredArtist = ref([]);
    const randomArtist = ref([]);

    const serviceArtist = artistService();


    ////
    // basique CRUD for artists
    ////
    async function getAllArtists() {
        allArtistData.value = await serviceArtist.getAllArtists();
    };

    async function getArtistById(id) {
        artist.value = await serviceArtist.getArtistById(id);
    };

    async function createArtist(data) {
        // return await serviceArtist.createArtist(data);
        const response = await serviceArtist.createArtist(data);
        if (response.status === 201) {
            artistId.value = response.data.artistId;
            console.log(artistId.value);
        }
        return response;
    };

    ////
    // Recover artist's pinned post for home page
    ////
    async function getLastRegisteredArtist(number) {
        lastRegisteredArtist.value = await serviceArtist.getLastRegisteredArtist(number);
    };

    async function getRandomArtist(number) {
        randomArtist.value = await serviceArtist.getRandomArtist(number);
    };


    ////
    // Artist post
    ////
    async function getArtistPosts(id) {
        artistPosts.value = await serviceArtist.getArtistPosts(id);
    };

    return {
        allArtistData,
        artist,
        artistPosts,
        lastRegisteredArtist,
        randomArtist,
        getAllArtists,
        getArtistById,
        createArtist,
        getArtistPosts,
        getLastRegisteredArtist,
        getRandomArtist
    }
});

