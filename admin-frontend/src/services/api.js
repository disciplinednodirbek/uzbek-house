import axios from "axios";

// Get the token directly when needed
const getToken = () => localStorage.getItem("token");

export const api = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  withCredentials: true,
});

api.interceptors.request.use(
  function (config) {
    // Add authorization header with token
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Handle unauthorized error (status code 401)
    if (error.response && error.response.status === 401) {
      const token = getToken();
      if (token) {
        localStorage.removeItem("token");
        // You might want to redirect to a login page or handle this differently
        window.location.reload(false);
      }
    }
    return Promise.reject(error);
  }
);
