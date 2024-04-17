import axios from 'axios';

// Create an instance of Axios with custom configuration
const api = axios.create({
    baseURL: 'http', // Your API base URL
    timeout: 10000, // expression en milisecondes, 10s pour envoyer une erreur après un temps de latence 
    headers: {
        'Content-Type': 'application/json',
    }
});

// Optionally, you can add request interceptors
api.interceptors.request.use(
    (config) => {
        // Modify request config before sending
        // For example, you can add authentication token here
        config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNkWjVQSjZob0FxWnRIMHJ2RU1aYiJ9.eyJpc3MiOiJodHRwczovL2Rldi0wM3JpNmo1ZjBjc240b3AyLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJoZDJLTVdEZVpsSklQQlVkRXBITkxLUENqRVhFMEIzc0BjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaWF0IjoxNzEzMzc1MTI0LCJleHAiOjE3MTM0NjE1MjQsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6ImhkMktNV0RlWmxKSVBCVWRFcEhOTEtQQ2pFWEUwQjNzIiwicGVybWlzc2lvbnMiOltdfQ.NambOZkYq7SUO3NxZEWcDStco0aPM34XdZmwzNshmJK-inzeDkzCwx9qkZXkDPgRMev9QG1XDAu5zpubKHUFOuvX0SHKas8PnF8v6F0Vh7mKniqG2txeBk2MiKfsOU9erUCTEST2gdAEQyuFEpSkBTlLphfUA-h9gh7BbbCDaPSFiwZ4-ZSEk8H4A8eIblz_eu4Up4QB2kCG2bsdphiFux-Ym38s3OdljQjD_JQ-WFm-Y1FKhGYks2j0FRV2k4XqAq0TaB9iLR2tBqoFfQ8bVyQKw17JggUUc_2VZcuypdjzEJM9XD8s6QGaMu4EoS5TklaBUOajCKSUF2Wk8YvIcg`;
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