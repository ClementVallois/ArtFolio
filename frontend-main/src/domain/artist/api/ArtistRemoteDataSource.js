import { CRUDapi } from "@/api/CrudApi";

////////////
////////////
// Api call management for artists
// all :id is artistId
////////////
////////////
function artistApi() {

    ////
    // basique CRUD for artists
    ////

    async function getAllArtists() {
        return await CRUDapi('GET', 'artists');
    }

    async function getAllArtistsWithPinnedPost() {
        return await CRUDapi('GET', 'artists/withPinnedPost');
    }

    async function getArtistById(id) {
        return await CRUDapi('GET', `artists/${id}`);
    }

    async function createArtist(data) {
        return await CRUDapi('POST', 'artists', data)
    }

    async function modifyArtist(id, data) {
        return await CRUDapi('PATCH', `artists/${id}`, data)
    }

    async function deleteArtist(id) {
        return await CRUDapi('DELETE', `artists/${id}`)
    }


    ////
    // Recover artist's pinned post for home page
    ////

    async function getLastRegisteredArtist(number) {
        return await CRUDapi('GET', `artists/last/${number}`)
    }

    async function getRandomArtist(number) {
        return await CRUDapi('GET', `artists/random/${number}`)
    }


    ////
    // Artist post
    ////

    async function getArtistPosts(id) {
        return await CRUDapi('GET', `artists/${id}/posts`)
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
    };
}

export { artistApi };




