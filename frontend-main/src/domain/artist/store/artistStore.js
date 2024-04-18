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
    }

    async function getArtistById(id) {
        try {
            const response = await artistApi().getArtistById(id);
            return User.fromJson(response);
        } catch (error) {
            console.log(error);
            console.error("Erreur lors de la récupération d'un artiste' :", error);
        }
    }


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
    }


    return {
        getAllArtists,
        getArtistById,
        getArtistPosts
    }
});

