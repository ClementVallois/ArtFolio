import { ref, toRaw } from 'vue'
import { personalDataRequestApi } from '../api/PersonalDataRequestRemoteDataSource'
import { defineStore } from 'pinia'
import { PersonalDataRequest } from '../model/PersonalDataRequestModel'

export const useStorePersonalDataRequest = defineStore('storePersonalDataRequest', () => {
  const allRequestedPersonalDataRequests = ref([])
  const personalDataRequestsFiltered = ref([])

  async function getAllRequestedPersonalDataRequests() {
    try {
      const response = await personalDataRequestApi().getAllRequestedPersonalDataRequests()
      if (Array.isArray(response)) {
        allRequestedPersonalDataRequests.value = response.map((jsonPersonalDataRequest) =>
          PersonalDataRequest.fromJson(jsonPersonalDataRequest)
        )
        return response.map((jsonPersonalDataRequest) =>
          PersonalDataRequest.fromJson(jsonPersonalDataRequest)
        )
      } else {
        console.error("La réponse n'est pas un tableau d'objets JSON :", response)
        return []
      }
    } catch (error) {
      console.log(error)
      console.error('Erreur lors de la récupération des demande de données personnelles:', error)
    }
  }

  function filterPersonalDataRequest(searchInput) {
    if (searchInput.value !== '' && searchInput.value !== null) {
      // Construct the regex pattern to match search input in first_name and last_name fields case insensitive
      const regex = new RegExp(searchInput.value, 'i')

      // Extract the Raw value of the reactive object
      const allRequestedPersonalDataRequestsRaw = toRaw(allRequestedPersonalDataRequests.value)

      // Filter the array of artist objects based on first_name or last_name matching the search input
      personalDataRequestsFiltered.value = allRequestedPersonalDataRequestsRaw.filter((artist) => {
        return regex.test(artist.firstName) || regex.test(artist.lastName)
      })
    } else {
      // Reset artistFiltered if searchInput is empty or null
      personalDataRequestsFiltered.value = []
    }
  }

  async function downloadPersonalDataRequest(id) {
    try {
      const response = await personalDataRequestApi().downloadPersonalDataRequest(id)
      return response
    } catch (error) {
      console.error('Error downloading personal data request:', error)
      throw error
    }
  }

  return {
    getAllRequestedPersonalDataRequests,
    downloadPersonalDataRequest,
    filterPersonalDataRequest,
    personalDataRequestsFiltered,
    allRequestedPersonalDataRequests
  }
})
