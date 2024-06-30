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
            const response = await apiArtist.getAllArtists();

            if (Array.isArray(response)) {
                return response.map(jsonUser => User.fromJson(jsonUser));
            } else {
                storeGlobal.logError("La réponse n'est pas un tableau d'objets JSON : " + response, 6);
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
            const response = await apiArtist.getArtistById(id);
            return User.fromJson(response);
        } catch (error) {
            storeGlobal.logError("Erreur lors de la récupération d'un artiste :" + error, 6);
        }
    };


    async function createArtist(data) {
        try {
            const response = await apiArtist.createArtist(data);
            return response;
        } catch (error) {
            storeGlobal.logError("Erreur lors de l'enregistrement d'un artiste : " + error.message, 6);
            throw new Error(error.message);
        }
    }

    async function modifyArtist(id, data) {
        try {
            const response = await apiArtist.modifyArtist(id, data);
            return response;
        } catch (error) {
            storeGlobal.logError("Erreur lors de la modification des informations d'un artiste : " + error.message, 6);
            throw new Error(error.message);
        }
    }

    async function deleteArtist(id) {
        try {
            const response = await apiArtist.deleteArtist(id);
            return response;
        } catch (error) {
            storeGlobal.logError("Erreur lors de la suppression d'un artiste : " + error.message, 6);
            throw new Error(error.message);
        }
    }

    ////
    // Recover artist's pinned post for home page
    ////
    async function getLastRegisteredArtist(number) {
        try {
            const response = await apiArtist.getLastRegisteredArtist(number);
            if (Array.isArray(response)) {
                return response;
                //  return response.map(jsonUser => User.fromJson(jsonUser));
            } else {
                storeGlobal.logError("La réponse n'est pas un tableau d'objets JSON : " + response, 6);
                return [];
            }
        } catch (error) {
            storeGlobal.logError("Erreur lors de la récupération des derniers artistes inscrits: " + error, 6);
        }
    };

    async function getRandomArtist(number) {
        try {
            const response = await apiArtist.getRandomArtist(number);
            if (Array.isArray(response)) {
                //  return response.map(jsonUser => User.fromJson(jsonUser));
                return response;
            } else {
                storeGlobal.logError("La réponse n'est pas un tableau d'objets JSON : " + response, 6);
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
            const response = await apiArtist.getArtistPosts(id);
            if (Array.isArray(response)) {
                return response.map(jsonPost => Post.fromJson(jsonPost));
            } else {
                storeGlobal.logError("La réponse n'est pas un tableau d'objets JSON : " + response, 6);
                return [];
            }
        } catch (error) {
            console.log(error);
            storeGlobal.logError("Erreur lors de la récupération des posts pour un artiste : " + error, 6);
        }
    };

    async function searchArtists(searchString) {
        try{
            let allArtist=toRaw(artistStore.allArtistData)
            if (allArtist.length === 0) {
                await artistStore.getAllArtists()
                allArtist=toRaw(artistStore.allArtistData)
            }
            return allArtist.filter(user => {
                return isStringInUser(searchString, user.artist)});
        } catch (error) {
            storeGlobal.logError('error in Search Artist Service'+ error, 6)
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