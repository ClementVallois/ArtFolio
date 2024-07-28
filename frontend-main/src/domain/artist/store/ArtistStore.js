import { defineStore } from 'pinia';
import { artistService } from '@/domain/artist/service/ArtistService.js';
import { ref } from 'vue';


/////////
///// Artist Store
/////////
export const useStoreArtist = defineStore('artistStore', () => {

    const allArtistData = ref([]);
    const artist = ref([]);
    // const artistId = ref("bf66a7f5-e7d8-4469-82f8-651beabb6f87");
    const artistId = ref("");
    //  const artistId = "be4a5e15-a7e6-4a78-90fa-5867b0f952fb";
    const artistPosts = ref([]);
    const lastRegisteredArtist = ref([]);
    const randomArtist = ref([]);
    const resultSearchArtist = ref([])
    const isSearchArtist = ref(false)

    const serviceArtist = artistService();


    ////
    // basique CRUD for artists
    ////
    async function getAllArtists() {
        allArtistData.value = await serviceArtist.getAllArtistsWithPinnedPost();
    };

    async function getArtistById(id) {
        artist.value = await serviceArtist.getArtistById(id);
        console.log(artist.value)
        return artist.value;
    };

    
    async function createArtist(data) {
        const response = await serviceArtist.createArtist(data);
        if (response.status === 201) {
            artistId.value = response.data.artistId;
        }
        return response;
    };


    async function modifyArtist(id, data) {
        return serviceArtist.modifyArtist(id, data);
    }

    async function deleteArtist(id, auth0Id) {
        const response = await serviceArtist.deleteArtist(id);
        await authenticationService().deleteUser(auth0Id)
        if (response.status) {
            console.log(response.status);
        }
        return response;
    }

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

    //Search function 
    async function searchArtists(searchString) {
        if (searchString == '') {
            resultSearchArtist.value = []
        } else {
            resultSearchArtist.value = await serviceArtist.searchArtists(searchString)
        }
    }


    return {
        allArtistData,
        artist,
        artistId,
        artistPosts,
        lastRegisteredArtist,
        randomArtist,
        resultSearchArtist,
        isSearchArtist,
        getAllArtists,
        getArtistById,
        createArtist,
        modifyArtist,
        deleteArtist,
        getArtistPosts,
        getLastRegisteredArtist,
        getRandomArtist,
        searchArtists,

    }
});

