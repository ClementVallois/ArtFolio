import api from '@/api/Api.js'
const apiURL = "http://127.0.0.1:3000";
import { useGlobalStore } from '@/store/GlobalStore.js';

function CRUDapi(verb, endpoint, data) {
    const storeGlobal = useGlobalStore();
    return new Promise(async (resolve, reject) => {
        const url = `${apiURL}/${endpoint}`
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
            storeGlobal.logError(error, 6);
            reject(new Error(error.response.data.message));
        }
    });
}

export { CRUDapi };