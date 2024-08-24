import { useState } from 'react';

export const useBoolean = (initialState: boolean = false) => {
    const [state, setState] = useState<boolean>(initialState);

    const setBooleanState = (newState: boolean) => {
        setState(newState);
    };

    return {
        state,
        setBooleanState,
    };
};
