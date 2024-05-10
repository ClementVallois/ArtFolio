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
        // if (auth0) {
        //     const token = await auth0.getAccessTokenSilently()
        //     config.headers.Authorization = `Bearer ${token}`;
        // } else {
        config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNkWjVQSjZob0FxWnRIMHJ2RU1aYiJ9.eyJpc3MiOiJodHRwczovL2Rldi0wM3JpNmo1ZjBjc240b3AyLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJoZDJLTVdEZVpsSklQQlVkRXBITkxLUENqRVhFMEIzc0BjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaWF0IjoxNzE1MzQ0ODM2LCJleHAiOjE3MTU0MzEyMzYsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6ImhkMktNV0RlWmxKSVBCVWRFcEhOTEtQQ2pFWEUwQjNzIiwicGVybWlzc2lvbnMiOltdfQ.m19XrWzKf3wJiAXoyCItb5lkFWs71Gauen9098JRp8hQZLV_KPmje6NTNyV7raEGruCDCtz2CMNgRbvjXmvFUUWV_C-PBzVzkrhHi4MAcvUD1dxygBVuH7ePOJNGkhAaNAGjsf90N6Ej7LsHlqniG-0rc2mVf1srx9FAUGQ0tF8PgfxL9_CVBXu2J_xJonRBXk1JrkPwf3Ut4pSzSMuFykLe99vfkq54sjbPEKeh31gDcsaNyAWrvjSsvkaeUKsBZmg8Zg49zPnWTWFqXtNkdfQgqH35ZZm2RLDfzwPLwRrbrQbTTNB2qMG-r5a5g56q4GkoZ8igu5_fGE1hwObAiw`;
        // }

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