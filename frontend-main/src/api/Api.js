import axios from 'axios';

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
    (config) => {
        // Modify request config before sending
        // For example, you can add authentication token here
        config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNkWjVQSjZob0FxWnRIMHJ2RU1aYiJ9.eyJpc3MiOiJodHRwczovL2Rldi0wM3JpNmo1ZjBjc240b3AyLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJoZDJLTVdEZVpsSklQQlVkRXBITkxLUENqRVhFMEIzc0BjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaWF0IjoxNzE1MDY4OTAzLCJleHAiOjE3MTUxNTUzMDMsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6ImhkMktNV0RlWmxKSVBCVWRFcEhOTEtQQ2pFWEUwQjNzIiwicGVybWlzc2lvbnMiOltdfQ.dpyrvu0qFibLI7gzU3xCVU9nUn7vHzLMNUu7SiB_2prXkny5vUU3sIVAwFlwiwhI9zT6Q2IC6ACdAJsa9jfhzK4mizH9Fewu7-vNxKeLeSE0LHD1BBVZ1mU-g-4W3X5mrjRnYPTkc12w8UWuS9Tp12Lqp7_IHyoD1I9Tq_hdN3BkDjJCdfiIQxmJBScPPbSp4YlOEAykjK3k8cX1sKT2pcGdqFfOuXUM_nUhZg0RxNFCLCgC5QrobV3t7Zxon38AboBMFjxDhrwzqp-W331QxVSFd1RNtuAr1qYOkQPMexzCmO2hKlVt78c8tXy7ermjV0ERH55jKDG3dl0CQrEtmg`;
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