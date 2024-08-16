import api from '@/api/api.js'

const apiURL = 'http://127.0.0.1:3000'

function CRUDapi(verb, endpoint, data, responseType = 'json') {
  return new Promise(async (resolve, reject) => {
    const url = `${apiURL}/${endpoint}`
    try {
      let response
      const config = {
        responseType: responseType
      }

      switch (verb) {
        case 'DELETE':
          response = await api.delete(url, config)
          break
        case 'PATCH':
          response = await api.put(url, data, config)
          break
        case 'POST':
          response = await api.post(url, data, config)
          break
        case 'GET':
          response = await api.get(url, config)
          break
        default:
          throw new Error('Wrong operation')
      }

      if (responseType === 'blob') {
        resolve(response)
      } else {
        resolve(response.data)
      }
    } catch (error) {
      console.error('Error CRUD operation:', error)
      reject(error)
    }
  })
}

export { CRUDapi }
