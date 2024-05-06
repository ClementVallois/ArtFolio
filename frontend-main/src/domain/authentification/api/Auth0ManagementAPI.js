//Ask Auth0 for a Management API v2 token
import Auth0ManagementAPIConfig from '../config/Auth0ManagementAPIConfig.js';
import axios from 'axios';


//Set the options with the Machine to Machine settings in Auth0
const options = {
    method: 'POST',
    url: `https://${Auth0ManagementAPIConfig.domain}/oauth/token`,
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: Auth0ManagementAPIConfig.clientId,
        client_secret: Auth0ManagementAPIConfig.clientSecret,
        audience: Auth0ManagementAPIConfig.audience
    })
}

// Create the axios Instance
//TODO: modify with .env
const auth0ManagementApi = axios.create({
    baseURL: 'https://dev-03ri6j5f0csn4op2.eu.auth0.com/api/v2/', // Your API base URL
    timeout: 10000, // expression en milisecondes, 10s pour envoyer une erreur après un temps de latence 
    headers: {
        'Content-Type': 'application/json',
    }
});

//Get the access token to use the API 
export async function getAccessTokenManagementAPI() {
    console.log('etape 3')
    auth0ManagementApi.request(options).then(function (response) {
        const token = response.data.access_token
        // storeAccessToken(token, response.data.expires_in)
        console.log(token)
        return(token);
    }).catch(function (error) {
        console.error(error);
    });
}


// Optionally, you can add request interceptors
auth0ManagementApi.interceptors.request.use(
    async(config) => {

    return config;
    },
    (error) => {
    // Handle request error
    return Promise.reject(error);
    }
);

export default auth0ManagementApi;

