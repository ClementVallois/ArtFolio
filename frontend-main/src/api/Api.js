import axios from 'axios';
import { auth0 } from '@/domain/authentification/index'

// Create an instance of Axios with custom configuration
const api = axios.create({
    baseURL: '', // Your API base URL
    timeout: 10000, // expression en milisecondes, 10s pour envoyer une erreur après un temps de latence 
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

// Define the routes and methods where Content-Type should be multipart/form-data
const routesWithMultipart = [
    { method: 'POST', route: '/artists' },
    { method: 'PATCH', route: '/artists' },
    { method: 'POST', route: '/amateurs' },
    { method: 'PATCH', route: '/amateurs' },
    { method: 'POST', route: '/post' }
];

const imageCache = new Map();

// Optionally, you can add request interceptors
api.interceptors.request.use(
    async (config) => {
        // Modify request config before sending
        const url = config.url;
        const method = config.method.toUpperCase();

        // Cache
        // if (url.includes('asset')) {
        //     if (imageCache.has(url)) {
        //         const cachedResponse = imageCache.get(url);
        //         return Promise.resolve({ ...config, data: cachedResponse });
        //     }
        // }

        // Check if the current request matches any of the defined routes and methods
        const shouldApplyMultipart = routesWithMultipart.some(
            entry => entry.method === method && url.includes(entry.route)
        );        
        if (shouldApplyMultipart) {
            config.headers['Content-Type'] = 'multipart/form-data';
        } else {
            // Default content type for other request methods or GET requests not containing '/assets'
            config.headers['Content-Type'] = 'application/json';
        }
        
        // Deal with blob
        if(url.includes('assets')){
            config.responseType= 'blob'
        }

        // Add Auth0 token
        if(auth0.isAuthenticated.value) {
            const token = await auth0.getAccessTokenSilently()
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Optionally, you can add response interceptors
api.interceptors.response.use(
    (response) => {
    // Cache image responses
    // const { config, data } = response;
    // const { url } = config;

    // if (url.includes('asset')) {
    //     imageCache.set(url, data);
    // }

    return response;
    },
    (error) => {
        // Handle response error
        return Promise.reject(error);
    }
);



export default api;