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
        config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNkWjVQSjZob0FxWnRIMHJ2RU1aYiJ9.eyJpc3MiOiJodHRwczovL2Rldi0wM3JpNmo1ZjBjc240b3AyLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJoZDJLTVdEZVpsSklQQlVkRXBITkxLUENqRVhFMEIzc0BjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaWF0IjoxNzEzMzQ3NjY2LCJleHAiOjE3MTM0MzQwNjYsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6ImhkMktNV0RlWmxKSVBCVWRFcEhOTEtQQ2pFWEUwQjNzIiwicGVybWlzc2lvbnMiOltdfQ.MNV_5GIF-Ab0XZ-lHm89WINFcWl8fo5afukz4Xz5dFp2A_K7KwC3NU2Wa8izWTPO26N0iN3V7-y6BKsCcVp7P-Kgx4djREq6H-H8BajLhGD82PmPlV88XJSNoLE_wXdDspPlRWQztIEINl4pLwMxd2OQy13wEVfNpWM44Ney0A9oB_xFO5Rv1JPaNT_5kesi35tol1YC08v879BG92O3UEfnV7lPRwPqF0NlFK5AvbCi-gJzxabeXgxnL8zGxzG5cmky7MhVgBbh2_oOhixROe8AqhLiZHbXLOu_AAsBmhTWM02WQ5KcsBxLafObbk3FXAQOCoHr-Wgit7JFOlRxjQ`;
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