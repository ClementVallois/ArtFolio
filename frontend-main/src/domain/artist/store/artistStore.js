import { defineStore } from 'pinia';
import { artistApi } from '@/domain/artist/api/ArtistRemoteDataSource';
import { Post } from '@/domain/artist/model/PostModel'
import { User } from '@/model/UserModel'
/////////
///// Artist Store
/////////
export const artistStore = defineStore('artistStore', () => {


    async function getAllArtists() {
        try {
            const response = await artistApi().getAllArtists();
            //  return response;
            if (Array.isArray(response)) {
                return response.map(jsonPost => Post.fromJson(jsonPost));
            } else {
                // Gérez le cas où la réponse n'est pas un tableau
                console.error("La réponse n'est pas un tableau d'objets JSON :", response);
                return [];
            }
        } catch (error) {
            console.log(error);
            console.error("Erreur lors de la récupération des artistes:", error);
        }
    }

    async function getArtistById(id) {
        try {
            const response = await artistApi().getArtistById(id);
            //  return response;
            return User.fromJson(response);
        } catch (error) {
            console.log(error);
            console.error("Erreur lors de la récupération d'un artiste' :", error);
        }
    }

    // async function getAllPost() {
    //     try {
    //         const response = await artistApi().getAllPost();
    //         //  return response;
    //         if (Array.isArray(response)) {
    //             return response.map(jsonPost => Post.fromJson(jsonPost));
    //         } else {
    //             // Gérez le cas où la réponse n'est pas un tableau
    //             console.error("La réponse n'est pas un tableau d'objets JSON :", response);
    //             return [];
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         console.error("Erreur lors de la récupération des publications d'artistes :", error);
    //     }
    // }

    return {
        getAllArtists,
        getArtistById
        // getAllPost
    }
});

