import api from '@/api/Api.js'
const apiURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000'
import { useGlobalStore } from '@/store/GlobalStore.js'

async function CRUDapi(verb, endpoint, data) {
  const storeGlobal = useGlobalStore()

  const url = `${apiURL}/${endpoint}`
  try {
    let response
    switch (verb) {
      case 'DELETE':
        response = api.delete(url)
        break
      case 'PATCH':
        response = api.patch(url, data)
        break
      case 'POST':
        response = api.post(url, data)
        break
      case 'GET':
        response = api.get(url)
        break
      default:
        throw new Error('Wrong operation')
    }
    return response
  } catch (error) {
    storeGlobal.logError(error, 6)
  }
}

export { CRUDapi }
