import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {

  async function CRUDapi(verb, tableName, id, data){
    // Promise.race to race between the CRUD() function and a timeout promise
    const timeoutPromise = this.timeoutPromise(7000)
    const requestPromise = new Promise( async (resolve, reject) => {   
        try {
            console.log('I am entering the CRUD')
            let response;
            const url= `${apiURL}/${tableName}`
            switch (verb) {
                case 'DELETE':
                    response = await axios.delete(`${url}/${id}`)
                    resolve(response)                
                    break;
                case 'PUT':
                    console.log(data)
                    response = await axios.put(`${url}/${id}`, data)
                    resolve(response)                
                    break;
                case 'POST':
                    response = await axios.post(url, data)
                    resolve(response)                
                    break;
                case 'GET':
                    if (id != null) {
                        response = await axios.get(`${url}/${id}`);
                        resolve(response.data) 
                    } else {
                        response = await axios.get(url)
                        resolve(response.data)
                    }
                    break;
                default:
                    throw new Error('Wrong operation')
            }
        } catch (error) {
            reject ('Error CRUD operation:', error.message)
        }
    })
    const resp = await Promise.race([timeoutPromise, requestPromise]);
    return resp
}

  return {
    CRUDapi
  }
})
