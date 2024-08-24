import { handleAxiosError } from "./error";
import {
    USERS_LOGIN,
    USERS_VERIFY_IDENTITY,
    USERS_LOGOUT,
} from '@env';
import axiosInstance from "../axiosInstance";
import {getRefreshToken} from "../axiosInstance";

interface CommonMessageResponse {
    message: string;
}

interface LoginResponse {
    id: string;
    user_admin: boolean;
    verified_identity: boolean;
    access_token: string;
    refresh_token: string;
}

export const login = async (data: {
    email: string;
    password: string;
}): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post<LoginResponse>(
            USERS_LOGIN,
            data,
            {
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

export const verifyIdentity = async (
    frontIdImageUri: string,
    backIdImageUri: string,
    faceImageUri: string,
    userId: string,
): Promise<CommonMessageResponse> => {
    const formData = new FormData();

    formData.append('front_id_image', {
        uri: frontIdImageUri,
        type: 'image/jpeg',
        name: 'front_id_image.jpg',
    } as any);

    formData.append('back_id_image', {
        uri: backIdImageUri,
        type: 'image/jpeg',
        name: 'back_id_image.jpg',
    } as any);

    formData.append('face_image', {
        uri: faceImageUri,
        type: 'image/jpeg',
        name: 'face_image.jpg',
    } as any);

    try {
        const response = await axiosInstance.post<CommonMessageResponse>(
            `${USERS_VERIFY_IDENTITY}${userId}/`,
            formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const logout = async (): Promise<CommonMessageResponse> => {
    try {
        const refreshToken = await getRefreshToken();

        const response = await axiosInstance.post<CommonMessageResponse>(
            USERS_LOGOUT,
            {
                refresh_token: refreshToken || '',
            },
            {
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
