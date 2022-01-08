// ========== [ ///// DEPENDANCIES ///// ] ==========
// ----- libraries -----
import React, { useState } from 'react';


// ========== [///// HOOK /////] ==========
const useTimer = (initialState) => {
    const [timer, setTimer] = useState(initialState);

    const updateTimer = (type, subtype, value) => {
        setTimer(timer => ({
            ...timer,
            [type]: {
                ...timer[type],
                [subtype]: value
            }
        }));
    }

    const clearTimeElapsed = (type) => {
        setTimer(timer => ({
            ...timer,
            [type]: {
                ...timer[type],
                elapsed: 0
            }
        }))
    }

    return [timer, updateTimer, clearTimeElapsed, setTimer];
}


// ========== [///// EXPORTS /////] ==========
export default useTimer;