import axios from 'axios';

// Create an instance of Axios with custom configuration
const api = axios.create({
    baseURL: 'http', // Your API base URL
    timeout: 10000,
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