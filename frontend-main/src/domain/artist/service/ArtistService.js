import { Post } from '@/domain/artist/model/PostModel';
import { User } from '@/model/UserModel';
import { artistApi } from '@/domain/artist/api/ArtistRemoteDataSource';


function artistService() {
    ////
    // basique CRUD for artists
    ////
    async function getAllArtists() {
        try {
            const response = await artistApi().getAllArtists();
            if (Array.isArray(response)) {
                return response.map(jsonUser => User.fromJson(jsonUser));
            } else {
                console.error("La réponse n'est pas un tableau d'objets JSON :", response);
                return [];
            }
        } catch (error) {
            console.log(error);
            console.error("Erreur lors de la récupération des artistes:", error);
        }
    };

    async function getArtistById(id) {
        try {
            const response = await artistApi().getArtistById(id);
            return User.fromJson(response);
        } catch (error) {
            console.log(error);
            console.error("Erreur lors de la récupération d'un artiste' :", error);
        }
    };


    ////
    // Recover artist's pinned post for home page
    ////
    async function getLastRegisteredArtist(number) {
        try {
            const response = await artistApi().getLastRegisteredArtist(number);
            if (Array.isArray(response)) {
                return response.map(jsonUser => User.fromJson(jsonUser));
            } else {
                console.error("La réponse n'est pas un tableau d'objets JSON :", response);
                return [];
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des derniers artistes inscrits:", error);
        }
    };

    async function getRandomArtist(number) {
        try {
            const response = await artistApi().getRandomArtist(number);
            if (Array.isArray(response)) {
                return response.map(jsonUser => User.fromJson(jsonUser));
            } else {
                console.error("La réponse n'est pas un tableau d'objets JSON :", response);
                return [];
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des derniers artistes inscrits:", error);
        }
    };


    ////
    // Artist post
    ////
    async function getArtistPosts(id) {
        try {
            const response = await artistApi().getArtistPosts(id);
            if (Array.isArray(response)) {
                return response.map(jsonPost => Post.fromJson(jsonPost));
            } else {
                console.error("La réponse n'est pas un tableau d'objets JSON :", response);
                return [];
            }
        } catch (error) {
            console.log(error);
            console.error("Erreur lors de la récupération d'un artiste' :", error);
        }
    };


    return {
        getAllArtists,
        getArtistById,
        getLastRegisteredArtist,
        getRandomArtist,
        getArtistPosts,
    };
}

export { artistService };