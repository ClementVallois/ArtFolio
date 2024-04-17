import { defineStore } from 'pinia';
import { dataSourceUser } from '@/api/userDataSource';
import { Optional } from '@/optionnal';
import { ref, computed } from 'vue';
import { artistApi } from '@/domain/artist/api/ArtistRemoteDataSource';
import { Post } from '@/domain/artist/model/PostModel'

/////////
///// Artist Store
/////////
export const artistStore = defineStore('artistStore', () => {
    const allUserData = ref(Optional.of(dataSourceUser));


    const getAllArtist = computed(() => {
        return !allUserData.value.isEmpty()
            ? allUserData.value.get().filter(artist => artist.role === "artist")
            : [];
    });

    function setArtist(artist) {
        allUserData.value = Optional.of(artist);
    }


    async function getAllPost() {
        try {
            const response = await artistApi().getAllPost();
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
            console.error("Erreur lors de la récupération des publications d'artistes :", error);
        }
    }

    return {
        allUserData,
        getAllArtist,
        setArtist,
        getAllPost
    }
});

