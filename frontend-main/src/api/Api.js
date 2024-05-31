import axios from 'axios';
import { auth0 } from '@/domain/authentification/index'

// Create an instance of Axios with custom configuration
const api = axios.create({
    baseURL: 'http', // Your API base URL
    timeout: 10000, // expression en milisecondes, 10s pour envoyer une erreur après un temps de latence 
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

// Optionally, you can add request interceptors
api.interceptors.request.use(
    async (config) => {
        // Modify request config before sending
        
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
        // Modify response data before passing it to the caller
        return response;
    },
    (error) => {
        // Handle response error
        return Promise.reject(error);
    }
);

export default api;