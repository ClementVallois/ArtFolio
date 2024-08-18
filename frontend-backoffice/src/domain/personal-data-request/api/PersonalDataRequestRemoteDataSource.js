import { CRUDapi } from '@/api/CrudApi'

function personalDataRequestApi() {
  async function getAllRequestedPersonalDataRequests() {
    return await CRUDapi('GET', 'personal-data-requests/requested')
  }

  async function downloadPersonalDataRequest(id) {
    return await CRUDapi('GET', `personal-data-requests/download/${id}`, null, 'blob')
  }

  return {
    getAllRequestedPersonalDataRequests,
    downloadPersonalDataRequest
  }
}

export { personalDataRequestApi }
