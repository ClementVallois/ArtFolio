import axios from 'axios';

// Create an instance of Axios with custom configuration
//TODO: Modify with .env
const api = axios.create({
    baseURL: 'http://localhost:3000', // Your API base URL
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
    // config.headers.Authorization = `Bearer ${getToken()}`;
    config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNkWjVQSjZob0FxWnRIMHJ2RU1aYiJ9.eyJpc3MiOiJodHRwczovL2Rldi0wM3JpNmo1ZjBjc240b3AyLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJoZDJLTVdEZVpsSklQQlVkRXBITkxLUENqRVhFMEIzc0BjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaWF0IjoxNzEzNDMwMTA1LCJleHAiOjE3MTM1MTY1MDUsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6ImhkMktNV0RlWmxKSVBCVWRFcEhOTEtQQ2pFWEUwQjNzIiwicGVybWlzc2lvbnMiOltdfQ.P19bfg7jJAJklxb_3T6PgzhfyLM0Hq2pD6W3u5QizGkMILoYMfpY2fDAJKsmhNUZW0kqhY8dmky0f0tapeBnA390sFYgU6OOTFe_AEBZrLVa5uatWzjohLy3l-W_ZFaeIgEUEarL3t4xs0F5t3xJz61aibv6PiPeM06sYa6MibPlOJXovnEsHp-qAmTxC4wzsJ36kQEWGlm0qc4bwqZ0Rn-JQUUkoCrQcnNxpnjTR7Sjk8yonNo9e1Yc4bOeha3hWBBWEKdwv_-Os20yQfNKyraKJmej4ZwzIq0IHV30oqmqzB17S-6Hg8mZQeKk820Wao6YJA9yUsdeqiyMIVVoNQ`;
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