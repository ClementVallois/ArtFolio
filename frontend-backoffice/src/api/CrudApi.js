import api from '@/api/Api'

async function CRUDapi(verb, tableName, id, data){
    try {
        let response;
        const url= `${apiURL}/${tableName}`
        switch (verb) {
            case 'DELETE':
                response = await api.delete(`${url}/${id}`)
                resolve(response)                
                break;
            case 'PUT':
                console.log(data)
                response = await api.put(`${url}/${id}`, data)
                resolve(response)                
                break;
            case 'POST':
                response = await api.post(url, data)
                resolve(response)                
                break;
            case 'GET':
                if (id != null) {
                    response = await api.get(`${url}/${id}`);
                    resolve(response.data) 
                } else {
                    response = await api.get(url)
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

export default CRUDapi;