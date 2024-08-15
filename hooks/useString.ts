import { useState } from 'react';

export const useString = (initialValue: string = '') => {
    const [value, setValue] = useState<string>(initialValue);
    const [error, setError] = useState<string | null>(null);

    const onChange = (text: string) => {
        setValue(text);
        if (error) {
            setError(null);
        }
    };

    return {
        value,
        onChange,
        error,
        setError,
    };
};
