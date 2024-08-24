import { useState } from 'react';

export const useInteger = (initialValue: number = 0) => {
    const [value, setValue] = useState<number>(initialValue);

    return {
        value,
        setValue,
    };
};
