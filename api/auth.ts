import { handleAxiosError } from "./error";
import { USERS_LOGIN } from '@env';
import axiosInstance from "../axiosInstance";

interface LoginResponse {
    id: string;
    user_admin: boolean;
}

export const login = async (data: {
    email: string;
    password: string;
}): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post<LoginResponse>(USERS_LOGIN, data,{
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};
