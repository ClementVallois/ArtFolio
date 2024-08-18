import { userApi } from '@/domain/user/api/UserRemoteDataSource'
import { useGlobalStore } from '@/store/GlobalStore.js'
import { User } from '@/model/UserModel'
import { PersonalDataRequest } from '@/model/PersonalDataRequestModel'

function userService() {
  const storeGlobal = useGlobalStore()
  const apiUser = userApi()

  ////
  // basique CRUD for user
  ////
  async function createUser(data) {
    try {
      return apiUser.createUser(data)
    } catch (error) {
      storeGlobal.logError(
        "Erreur lors de l'enregistrement d'un amateur : " + error.data.message,
        6
      )
      const newError = new Error(error.data.message)
      newError.code = 409 // Conflict
      throw newError
    }
  }

  async function getUserById(id) {
    try {
      const response = await apiUser.getUserById(id)
      return User.fromJson(response)
    } catch (error) {
      storeGlobal.logError("Erreur lors de la récupération d'un amateur :" + error, 6)
    }
  }

  async function modifyUser(id, data) {
    try {
      return apiUser.modifyUser(id, data)
    } catch (error) {
      storeGlobal.logError(
        "Erreur lors de la modification des informations d'un amateur: " + error.message,
        6
      )
      throw new Error(error.message)
    }
  }

  async function deleteUser(id) {
    try {
      return apiUser.deleteUser(id)
    } catch (error) {
      storeGlobal.logError("Erreur lors de la suppression d'un amateur : " + error.message, 6)
      throw new Error(error.message)
    }
  }

  async function createPersonalDataRequest(id) {
    try {
      const response = await apiUser.createPersonalDataRequest(id)
      return PersonalDataRequest.fromJson(response)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return { error: 'Request already exists' }
      }

      storeGlobal.logError(
        "Erreur lors de la création d'une demande récupération des données personnelles : " +
          error.message,
        6
      )
      throw new Error(error.message)
    }
  }

  async function getUserProfilePicture(id) {
    try {
      const response = await apiUser.getUserProfilePicture(id)
      const blob = new Blob([response.data], { type: response.data.type })
      const url = URL.createObjectURL(blob)
      return url
    } catch (error) {
      storeGlobal.logError(
        'Erreur lors de la récupération de la photo de profil : ' + error.message,
        6
      )
    }
  }

  ////
  // Auth0
  ////
  async function getUserWithAuth0Id(auth0Id) {
    try {
      const response = await apiUser.getUserWithAuth0Id(auth0Id)
      return User.fromJson(response)
    } catch (error) {
      storeGlobal.logError('Erreur lors de la récupération des artistes: ' + error, 6)
      return error
    }
  }

  return {
    createUser,
    getUserById,
    modifyUser,
    getUserWithAuth0Id,
    deleteUser,
    createPersonalDataRequest,
    getUserProfilePicture
  }
}

export { userService }
