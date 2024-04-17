import api from '@/api/Api.js'
const apiURL = "http://127.0.0.1:3000";

function CRUDapi(verb, endpoint, id, data) {
    return new Promise(async (resolve, reject) => {
        try {
            let response;
            const url = `${apiURL}/${endpoint}`;
            switch (verb) {
                case 'DELETE':
                    response = await api.delete(`${url}/${id}`);
                    resolve(response);
                    break;
                case 'PATCH':
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

export { CRUDapi };