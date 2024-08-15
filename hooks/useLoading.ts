import { useState } from 'react';

export const useLoading = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const setLoadingState = (state: boolean) => {
        setLoading(state);
    };

    return {
        loading,
        setLoadingState,
    };
};
