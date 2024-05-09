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
    async(config) => {
        // Modify request config before sending
        // Add Auth0 token 
        if(auth0) {
            const token = await auth0.getAccessTokenSilently()
            config.headers.Authorization = `Bearer ${token}`;
        }
        else {
            config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNkWjVQSjZob0FxWnRIMHJ2RU1aYiJ9.eyJpc3MiOiJodHRwczovL2Rldi0wM3JpNmo1ZjBjc240b3AyLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJoZDJLTVdEZVpsSklQQlVkRXBITkxLUENqRVhFMEIzc0BjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaWF0IjoxNzE1MjUwMzYzLCJleHAiOjE3MTUzMzY3NjMsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6ImhkMktNV0RlWmxKSVBCVWRFcEhOTEtQQ2pFWEUwQjNzIiwicGVybWlzc2lvbnMiOltdfQ.nN_F1GF3ZpzkFTeUQhdmt9wIam5DxYF4xb_dIG6iLoc50uhLBGflGR-bM1wpeoL6a3HC0ux7Xa-8Gn7KngteU7Bpk-VhNummyfUWtPjzsxLz2fwdUNbE8Vxt8P13lx6VKUgCR6PASHSpZjstQi-JIawrvAeRenQZHP-w97lZLMr_OSBOKOzfTBmjfMYynlDH_4aIJlPMkvIi2eylU8m1lWMbWwedX-Cr33mrZngVcIjAxQUOC_mSOh-fYB9qOQiE61uGrqT2vASZ103lY78IVHgo-jOHA5bO3jwWMYSjt34u9hUVjI16_x81MXt6nHbQz06_uNfILYc2Ns_udyp8lQ`;
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