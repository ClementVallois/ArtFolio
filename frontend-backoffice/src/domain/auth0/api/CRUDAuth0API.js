import auth0ManagementApi from './Auth0ManagementAPI'

//TODO: Modify .env
// const apiURL = process.env.AUTH0_MANAGEMENT_API_URL || "http://127.0.0.1:3000";

const apiURL = "https://dev-03ri6j5f0csn4op2.eu.auth0.com/api/v2";

function CRUDAuth0API(verb, endpoint, data) {
    return new Promise(async (resolve, reject) => {
        const url = `${apiURL}/${endpoint}`
        try {
            let response;
            switch (verb) {
                case 'DELETE':
                    response = await auth0ManagementApi.delete(url);
                    resolve(response);
                    break;
                case 'PATCH':
                    response = await auth0ManagementApi.put(url, data);
                    resolve(response);
                    break;
                case 'POST':
                    response = await auth0ManagementApi.post(url, data);
                    resolve(response);
                    break;
                case 'GET':
                    response = await auth0ManagementApi.get(url);
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

export { CRUDAuth0API };