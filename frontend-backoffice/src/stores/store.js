import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalStore', () => {

async function CRUDapi(verb, tableName, id, data){
    try {
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
        return response
    } catch (error) {
        throw new Error('Error CRUD operation:', error.message)
    }
}


return {
    CRUDapi
    }

})
