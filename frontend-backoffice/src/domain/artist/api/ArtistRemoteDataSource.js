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
        // const { id, firstName, lastName, birthdate, username, description, status, role, auth0Id } = data;
        // const newArtist = new User(id, firstName, lastName, birthdate, username, description, status, role, auth0Id);
        return await CRUDapi('POST', 'artists', null, data)
    }

    async function modifyArtist(id, data) {
        return await CRUDapi('PATCH', 'artist', id, data)
    }

    async function deleteArtist(id) {
        return await CRUDapi('DELETE', 'artists', id)
    }

    ////
    // User Personal Data Request
    ////
    async function createPersonalDataRequest(id) {
        return CRUDapi('POST', `personal-data-requests/me/${id}`)
    }


    ////
    // Recover artist's pinned post for home page
    ////

    async function getLastRegisteredArtist(number) {
        return await CRUDapi('GET', `users/artists/last/${number}`)
    }

    async function getRandomArtist(number) {
        return await CRUDapi('GET', `users/artists/random/${number}`)
    }


    ////
    // Artist post
    ////

    async function getArtistPosts(id) {
        return await CRUDapi('GET', 'artists/posts', id)
    }
    // TODO: à enlever
    async function getAllPost() {
        return await CRUDapi('GET', "posts")
    }

    return {
        getAllArtists,
        getAllArtistsWithPinnedPost,
        getArtistById,
        createArtist,
        modifyArtist,
        deleteArtist,
        createPersonalDataRequest,
        getLastRegisteredArtist,
        getRandomArtist,
        getArtistPosts,
        getAllPost
    };
}

export { artistApi };