import api from '@/api/Api'

function CRUDapi(verb, tableName, id, data) {
    return new Promise(async (resolve, reject) => {
        try {
            let response;
            const url = `${apiURL}/${tableName}`;
            switch (verb) {
                case 'DELETE':
                    response = await api.delete(`${url}/${id}`);
                    resolve(response);
                    break;
                case 'PUT':
                    response = await api.put(`${url}/${id}`, data);
                    resolve(response);
                    break;
                case 'POST':
                    response = await api.post(url, data);
                    resolve(response);
                    break;
                case 'GET':
                    if (id != null) {
                        response = await api.get(`${url}/${id}`);
                        resolve(response.data);
                    } else {
                        response = await api.get(url);
                        resolve(response.data);
                    }
                    break;
                default:
                    throw new Error('Wrong operation');
            }
        } catch (error) {
            reject(new Error('Error CRUD operation:', error.message));
        }
    });
}

export default CRUDapi;