const { CRUDapi } = require("@/api/CrudApi");

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

    function getAllArtist() {
        return CRUDapi('GET', '/artists')
    }

    function getArtistById(id) {
        return CRUDapi('GET', '/artists', id)
    }

    function createArtist(data) {
        // const { id, firstName, lastName, birthdate, username, description, status, role, auth0Id } = data;
        // const newArtist = new User(id, firstName, lastName, birthdate, username, description, status, role, auth0Id);
        return CRUDapi('POST', '/artists', null, data)
    }

    function modifyArtist(id, data) {
        return CRUDapi('PATCH', '/artist', id, data)
    }

    function deleteArtist(id) {
        return CRUDapi('DELETE', '/artists', id)
    }


    ////
    // Recover artist's pinned post for home page
    ////

    function getLastRegisteredArtist(number) {
        return CRUDapi('GET', `/users/artists/last/${number}`)
    }

    function getRandomArtist(number) {
        return CRUDapi('GET', `/users/artists/random/${number}`)
    }


    ////
    // Artist post
    ////

    function getArtistPosts(id) {
        return CRUDapi('GET', '/artists/posts', id)
    }

    return {
        getAllArtist,
        getArtistById,
        createArtist,
        modifyArtist,
        deleteArtist,
        getLastRegisteredArtist,
        getRandomArtist,
        getArtistPosts
    };
}

module.exports = artistApi;