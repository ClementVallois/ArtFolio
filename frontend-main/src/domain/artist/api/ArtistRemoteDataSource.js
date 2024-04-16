const User = require("@/model/UserModel");


//////
// Gestion des appels Api pour les artist
//////
function artistApi() {

    // 
    function getAllArtist() {
        return CRUDapi('GET', '/users/artists')
    }

    function getArtistById(id) {
        return CRUDapi('GET', '/users/artists', id)
    }

    function createArtist(data) {
        const { id, firstName, lastName, birthdate, username, description, status, role, auth0Id } = data;
        const newArtist = new User(id, firstName, lastName, birthdate, username, description, status, role, auth0Id);
        return newArtist;
    }

    function modifyArtist(id, data) {

    }

    return {
        getAllArtist,
        getArtistById,
        createArtist
    };
}

module.exports = artistApi;
