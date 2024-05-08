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
        config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNkWjVQSjZob0FxWnRIMHJ2RU1aYiJ9.eyJpc3MiOiJodHRwczovL2Rldi0wM3JpNmo1ZjBjc240b3AyLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJoZDJLTVdEZVpsSklQQlVkRXBITkxLUENqRVhFMEIzc0BjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaWF0IjoxNzE1MDg5NTU5LCJleHAiOjE3MTUxNzU5NTksImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6ImhkMktNV0RlWmxKSVBCVWRFcEhOTEtQQ2pFWEUwQjNzIiwicGVybWlzc2lvbnMiOltdfQ.ckyqm31SHxUBo_B8tW3Jn_FsTCyPtBsZqHYInJlFt2YMMbLhj8jR3z9yS9xJX-GSJMaHupNGqYLA7SVPgwE8gBAjBICLbug-h0u8cHcTDW8JgAYj5nTnYYawN0I399toLniMN7kMyJZjJ5J1fEo40qiDA7lO_unOTaAOIXgiPo53xnJGjTitfMw1C7S-9xZx5bxxsZsstNlqyJvKUA9E-hQ0tdbMm8OIm8CDpp_LUrx0699YF4ohOAWHEJe8iYhfHxKUXxa6MJP9ESDAOkqMdl3BNt4RODO-5tgV-FAgK7yGDH8e8GVU8h0R8ScBqtJTJ1yI4NqnEf2UUQauaIhQsQ`;
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