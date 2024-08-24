import { useState } from 'react';

export const useStringOrNull = (initialValue: string | null = null) => {
    const [value, setValue] = useState<string | null>(initialValue);

    return {
        value,
        setValue,
    };
};
