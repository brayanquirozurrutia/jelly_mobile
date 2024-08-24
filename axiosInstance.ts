import axios from 'axios';
import { BASE_BACKEND_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

const axiosInstance = axios.create({
    baseURL: BASE_BACKEND_URL,
    withCredentials: true,
    headers: {
        'X-Login-Source': 'mobile',
    },
});

const getAccessToken = async () => {
    return await SecureStore.getItemAsync('accessToken');
};

export const getRefreshToken = async () => {
    return await SecureStore.getItemAsync('refreshToken');
};

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
