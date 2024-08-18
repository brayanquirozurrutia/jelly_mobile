import axios from 'axios';
import { BASE_BACKEND_URL } from '@env';

const axiosInstance = axios.create({
    baseURL: BASE_BACKEND_URL,
    withCredentials: true,
});

export default axiosInstance;
