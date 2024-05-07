import { defineStore } from 'pinia';
import { artistService } from '@/domain/artist/service/ArtistService.js';
import { ref } from 'vue';


/////////
///// Artist Store
/////////
export const useStoreArtist = defineStore('artistStore', () => {

    const allArtistData = ref([]);
    const artist = ref([]);
    const artistPosts = ref([]);
    const lastRegisteredArtist = ref([]);
    const randomArtist = ref([]);

    ////
    // basique CRUD for artists
    ////
    async function getAllArtists() {
        allArtistData.value = await artistService().getAllArtists();
    };

    async function getArtistById(id) {
        artist.value = await artistService().getArtistById(id);
    };

    async function createArtist(data) {
        return await artistService().createArtist(data);
    };

    ////
    // Recover artist's pinned post for home page
    ////
    async function getLastRegisteredArtist(number) {
        lastRegisteredArtist.value = await artistService().getLastRegisteredArtist(number);
    };

    async function getRandomArtist(number) {
        randomArtist.value = await artistService().getRandomArtist(number);
    };


    ////
    // Artist post
    ////
    async function getArtistPosts(id) {
        artistPosts.value = await artistService().getArtistPosts(id);
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

