import axios, { AxiosError } from "axios";

interface ErrorResponse {
    error?: string;
    message?: string;
}

export const handleAxiosError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response?.data?.error) {
            throw new Error(axiosError.response.data.error);
        } else if (axiosError.response?.data?.message) {
            throw new Error(axiosError.response.data.message);
        } else if (axiosError.response?.status === 429) {
            throw new Error('Demasiadas solicitudes, intente nuevamente en unos minutos');
        } else {
            throw new Error('Ocurrió un error');
        }
    } else {
        throw new Error('Error inesperado');
    }
};
