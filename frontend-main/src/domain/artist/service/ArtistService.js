import { Post } from '@/domain/artist/model/PostModel';
import { User } from '@/model/UserModel';
import { artistApi } from '@/domain/artist/api/ArtistRemoteDataSource';
import { useGlobalStore } from '@/store/GlobalStore.js';
import { useStoreArtist } from '@/domain/artist/store/ArtistStore.js';
import { toRaw } from 'vue';

function artistService() {
    const storeGlobal = useGlobalStore();
    const apiArtist = artistApi();
    const artistStore = useStoreArtist()
    ////
    // basique CRUD for artists
    ////
    async function getAllArtists() {
        try {
            const { data } = await apiArtist.getAllArtists();

            if (Array.isArray(data)) {
                return data.map(jsonUser => User.fromJson(jsonUser));
            } else {
                storeGlobal.logError("La réponse n'est pas un tableau d'objets JSON : " + data, 6);
                return [];
            }
        } catch (error) {
            storeGlobal.logError("Erreur lors de la récupération des artistes: " + error, 6);
        }
    };

    async function getAllArtistsWithPinnedPost() {
        try {
            const response = await apiArtist.getAllArtistsWithPinnedPost();
            if (Array.isArray(response)) {
                return response
            } else {
                storeGlobal.logError("La réponse n'est pas un tableau d'objets JSON : " + response, 6);
                return [];
            }
        } catch (error) {
            storeGlobal.logError("Erreur lors de la récupération des artistes: " + error, 6);
        }
    };


    async function getArtistById(id) {
        try {
            const { data } = await apiArtist.getArtistById(id);
            return User.fromJson(data);
        } catch (error) {
            storeGlobal.logError("Erreur lors de la récupération d'un artiste :" + error, 6);
        }
    };


    async function createArtist(data) {
        try {
            return apiArtist.createArtist(data);
        } catch (error) {
            storeGlobal.logError("Erreur lors de l'enregistrement d'un artiste : " + error.message, 6);
            throw new Error(error.message);
        }
    }

    async function modifyArtist(id, data) {
        try {
            return apiArtist.modifyArtist(id, data);
        } catch (error) {
            storeGlobal.logError("Erreur lors de la modification des informations d'un artiste : " + error.message, 6);
            throw new Error(error.message);
        }
    }

    async function deleteArtist(id) {
        try {
            return apiArtist.deleteArtist(id);
        } catch (error) {
            storeGlobal.logError("Erreur lors de la suppression d'un artiste : " + error.message, 6);
            throw new Error(error.message);
        }
    }

    ////
    // Recover artist's pinned post for home page
    ////
    //TODO: modifier le return await
    async function getLastRegisteredArtist(number) {
        try {
            const { data } = await apiArtist.getLastRegisteredArtist(number);
            if (Array.isArray(data)) {
                return data;
                //  return response.map(jsonUser => User.fromJson(jsonUser));
            } else {
                storeGlobal.logError("La réponse n'est pas un tableau d'objets JSON : " + data, 6);
                return [];
            }
        } catch (error) {
            storeGlobal.logError("Erreur lors de la récupération des derniers artistes inscrits: " + error, 6);
        }
    };

    //TODO: modifier le return await
    async function getRandomArtist(number) {
        try {
            const { data } = await apiArtist.getRandomArtist(number);
            if (Array.isArray(data)) {
                return data;
            } else {
                storeGlobal.logError("La réponse n'est pas un tableau d'objets JSON : " + data, 6);
                return [];
            }
        } catch (error) {
            storeGlobal.logError("Erreur lors de la récupération des derniers artistes aléatoires : " + error, 6);
        }
    };


    ////
    // Artist post
    ////
    async function getArtistPosts(id) {
        try {
            const { data } = await apiArtist.getArtistPosts(id);
            if (Array.isArray(data)) {
                return data.map(jsonPost => Post.fromJson(jsonPost));
            } else {
                storeGlobal.logError("La réponse n'est pas un tableau d'objets JSON : " + data, 6);
                return [];
            }
        } catch (error) {
            console.log(error);
            storeGlobal.logError("Erreur lors de la récupération des posts pour un artiste : " + error, 6);
        }
    };


    ////
    // Search Artist
    ////
    async function searchArtists(searchString) {
        try {
            let allArtist = toRaw(artistStore.allArtistData)
            if (allArtist.length === 0) {
                await artistStore.getAllArtists()
                allArtist = toRaw(artistStore.allArtistData)
            }
            return allArtist.filter(user => {
                return isStringInUser(searchString, user.artist)});
        } catch (error) {
            storeGlobal.logError('error in Search Artist Service' + error, 6)
        }
    }

    // Set the regex for the search 
    function isStringInUser(searchString, user) {
        // Échappe les caractères spéciaux dans la chaîne de recherche pour éviter les erreurs de syntaxe regex
        const escapedSearchString = searchString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedSearchString, 'i'); // 'i' pour insensible à la casse
        const response =  ['firstName', 'lastName', 'username'].some((key) => regex.test(user[key]));
        return response
    }

    return {
        getAllArtists,
        getAllArtistsWithPinnedPost,
        getArtistById,
        createArtist,
        modifyArtist,
        deleteArtist,
        getLastRegisteredArtist,
        getRandomArtist,
        getArtistPosts,
        searchArtists
    };
}

export { artistService };