// ========== [ ///// DEPENDANCIES ///// ] ==========
// ----- libraries -----
import React, { useState } from 'react';


// ========== [///// HOOK /////] ==========
const useCarousel = (initialState) => {
    const [carousel, setCarousel] = useState(initialState);

    const updateCarousel = (type, value) => {
        setCarousel(carousel => ({ ...carousel, [type]: value }));
    }

    const resetCarousel = () => {
        setCarousel(initialState);
    }

    return [carousel, updateCarousel, resetCarousel, setCarousel];
}


// ========== [///// EXPORTS /////] ==========
export default useCarousel;