import { CRUDapi } from '@/api/CrudApi'
import { useGlobalStore } from '@/store/GlobalStore'

////////////
////////////
// Api call management for users
////////////
////////////
function userApi() {
  const storeGlobal = useGlobalStore()
  ////
  // basique CRUD for users
  ////
  async function createUser(data) {
    return CRUDapi('POST', 'amateurs', data)
  }

  async function getUserById(id) {
    return CRUDapi('GET', `amateurs/${id}`)
  }

  async function deleteUser(id) {
    return CRUDapi('DELETE', `amateurs/${id}`)
  }

  async function modifyUser(id, data) {
    return CRUDapi('PATCH', `amateurs/${id}`, data)
  }

  async function getUserProfilePicture(id) {
    return CRUDapi('GET', `amateurs/${id}/assets`)
  }

  ////
  // User Personal Data Request
  ////
  async function createPersonalDataRequest(id) {
    return CRUDapi('POST', `personal-data-requests`, id)
  }

  ////
  // Auth0
  ////
  async function getUserWithAuth0Id(auth0Id) {
    try {
      const response = await CRUDapi('GET', `users/auth0Id/${auth0Id}`)
      return response
    } catch (error) {
      storeGlobal.logError(error, 6)
      return error
    }
  }

  return {
    createUser,
    getUserWithAuth0Id,
    getUserById,
    deleteUser,
    modifyUser,
    getUserProfilePicture,
    createPersonalDataRequest
  }
}

export { userApi }
