import { handleAxiosError } from "./error";
import { USERS_LOGIN, USERS_VERIFY_IDENTITY } from '@env';
import axiosInstance from "../axiosInstance";

interface LoginResponse {
    id: string;
    user_admin: boolean;
    verified_identity: boolean;
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


interface VerifyICResponse {
    message?: string;
}

export const verifyIdentity = async (
    frontIdImageUri: string,
    backIdImageUri: string,
    faceImageUri: string
): Promise<VerifyICResponse> => {
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
        const response = await axiosInstance.post<VerifyICResponse>(
            USERS_VERIFY_IDENTITY,
            formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return handleAxiosError(error);
    }
};
