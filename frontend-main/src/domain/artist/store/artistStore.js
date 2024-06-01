import { defineStore } from 'pinia';
import { artistService } from '@/domain/artist/service/ArtistService.js';
import { ref } from 'vue';


/////////
///// Artist Store
/////////
export const useStoreArtist = defineStore('artistStore', () => {

    const allArtistData = ref([]);
    const artist = ref([]);
    // const artistId = ref("67064a47-f195-4f62-8e03-022f5baa4440");
    const artistId = "93ecbae3-c73c-4ada-9925-0a1a6eb769f0";
    const artistPosts = ref([]);
    const lastRegisteredArtist = ref([]);
    const randomArtist = ref([]);
    const resultSearchArtist = ref([])

    const serviceArtist = artistService();


    ////
    // basique CRUD for artists
    ////
    async function getAllArtists() {
        allArtistData.value = await serviceArtist.getAllArtists();
    };

    async function getArtistById(id) {
        artist.value = await serviceArtist.getArtistById(id);
        return artist.value;
    };

    async function createArtist(data) {
        // return await serviceArtist.createArtist(data);
        const response = await serviceArtist.createArtist(data);
        if (response.status === 201) {
            //TODO: Verifier l'ajout de l'artistId après la connexion
            console.log(response.data)
            console.log(response.data.artistId);
            //  artistId.value = response.data.artistId;
            // console.log(artistId.value);
        }
        return response;
    };


    async function modifyArtist(id, data) {
        const response = await serviceArtist.modifyArtist(id, data);
        if (response.status) {
            console.log(response.status);
        }
        return response;
    }

    async function deleteArtist(id) {
        const response = await serviceArtist.deleteArtist(id);
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
        if(searchString == ''){
            resultSearchArtist.value=[]
        }else{
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

