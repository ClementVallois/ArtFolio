import { CRUDapi } from '@/api/CrudApi'

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
    return CRUDapi('GET', 'artists')
  }

  async function getAllArtistsWithPinnedPost() {
    return CRUDapi('GET', 'artists/withPinnedPost')
  }

  async function getArtistById(id) {
    return CRUDapi('GET', `artists/${id}`)
  }

  async function createArtist(data) {
    return CRUDapi('POST', 'artists', data)
  }

  async function modifyArtist(id, data) {
    return CRUDapi('PATCH', `artists/${id}`, data)
  }

  async function deleteArtist(id) {
    return CRUDapi('DELETE', `artists/${id}`)
  }

  async function getUserProfilePicture(id) {
    return CRUDapi('GET', `users/${id}/assets`)
  }

  ////
  // Recover artist's pinned post for home page
  ////

  async function getLastRegisteredArtist(number) {
    return CRUDapi('GET', `artists/last/${number}`)
  }

  async function getRandomArtist(number) {
    return CRUDapi('GET', `artists/random/${number}`)
  }

  ////
  // Artist post
  ////

  async function getArtistPosts(id) {
    return CRUDapi('GET', `artists/${id}/posts`)
  }

  async function getArtistProfilePicture(id) {
    return CRUDapi('GET', `artists/${id}/assets`)
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
    getArtistProfilePicture
  }
}

export { artistApi }
