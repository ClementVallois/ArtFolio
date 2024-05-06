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
        config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNkWjVQSjZob0FxWnRIMHJ2RU1aYiJ9.eyJpc3MiOiJodHRwczovL2Rldi0wM3JpNmo1ZjBjc240b3AyLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJoZDJLTVdEZVpsSklQQlVkRXBITkxLUENqRVhFMEIzc0BjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaWF0IjoxNzE0OTg1MDI5LCJleHAiOjE3MTUwNzE0MjksImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6ImhkMktNV0RlWmxKSVBCVWRFcEhOTEtQQ2pFWEUwQjNzIiwicGVybWlzc2lvbnMiOltdfQ.a2lfodKQp_VvwEoyCsMRFCAJtc3tAxR9g6ujyFEBMtbVFBXxeG1FMjjbfZNY5bYk_YFZWFkyrLugcFPixTfuqaTmdzeVJ4rQRG0U6sr4Rt6aGTK7AdkwVsiZAMyyvnDFNwtGucAPtWa4fKEhiqVkywjsJafRB4nxf8k50PqhS-50UI8qT8Im_H_WI0IopL8GJhS1JqmsKx42JnrYKgit9H01cqN3D-RvOFMA3hS4dQ-GaXcpzx2DCcRpQ-8TU0VTZ436AQAqh2-amuY3MnmLy2i6qNqRWY1yCfNpvCYvsGv_alRfZzQwLJYCkr2TPBa2luCLIobVAjH0G-A3TYIl1w`;
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