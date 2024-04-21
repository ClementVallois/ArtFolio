import api from '@/api/Api.js'
const apiURL = "http://127.0.0.1:3000";

function CRUDapi(verb, endpoint, data) {
    return new Promise(async (resolve, reject) => {
        const url = `${apiURL}/${endpoint}`
        console.log("url: ", url);
        try {
            let response;
            switch (verb) {
                case 'DELETE':
                    response = await api.delete(url);
                    resolve(response);
                    break;
                case 'PATCH':
                    response = await api.put(url, data);
                    resolve(response);
                    break;
                case 'POST':
                    response = await api.post(url, data);
                    resolve(response);
                    break;
                case 'GET':
                    response = await api.get(url);
                    resolve(response.data);
                    break;
                default:
                    throw new Error('Wrong operation');
            }
        } catch (error) {
            console.log(error);
            reject(new Error('Error CRUD operation:', error.message));
        }
    });
}

export { CRUDapi };