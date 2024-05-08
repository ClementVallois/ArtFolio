import { Post } from '@/domain/artist/model/PostModel';
import { User } from '@/model/UserModel';
import { artistApi } from '@/domain/artist/api/ArtistRemoteDataSource';
import { useGlobalStore } from '@/store/GlobalStore.js';

function artistService() {
    const storeGlobal = useGlobalStore();
    const apiArtist = artistApi();

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

    ////
    // Recover artist's pinned post for home page
    ////
    async function getLastRegisteredArtist(number) {
        try {
            const response = await apiArtist.getLastRegisteredArtist(number);
            if (Array.isArray(response)) {
                return response.map(jsonUser => User.fromJson(jsonUser));
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
                return response.map(jsonUser => User.fromJson(jsonUser));
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


    return {
        getAllArtists,
        getArtistById,
        createArtist,
        getLastRegisteredArtist,
        getRandomArtist,
        getArtistPosts,
    };
}

export { artistService };