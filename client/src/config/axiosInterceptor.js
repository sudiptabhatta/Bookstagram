import Cookies from "js-cookie";
import axiosInstance from "./axiosInstance";
import axios from "axios";

// Add a request interceptor to axios instance
axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = Cookies.get('accessToken')
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`; // set in header 
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  

// Add response interceptor to update access token using refresh token for secure api call.
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const refreshToken = Cookies.get('refreshToken');
          const response = await axiosInstance.post('/auth/jwt/token/refresh/', { refresh: refreshToken });
          // const newAccessToken = response.data.access;

          Cookies.set('accessToken', response.data.access);
  
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return axios(originalRequest); // //recall Api with new token
        } catch (error) {
          // Handle refresh token error or redirect to login
          console.log('Failed to refresh access token', error)
        }
      }
  
      return Promise.reject(error);
    }
  );
  

export default axiosInstance;
