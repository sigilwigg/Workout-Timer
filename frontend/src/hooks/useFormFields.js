// ========== [ ///// DEPENDANCIES ///// ] ==========
// ----- libraries -----
import { useState } from 'react';


// ========== [///// HOOK /////] ==========
const useFormFields = (initialState) => {
    const [formData, setFormData] = useState(initialState);
    const handleChange = (e) => {
        setFormData(formData => ({ ...formData, [e.target.name]: e.target.value }));
    }
    const resetFormData = () => {
        setFormData(initialState);
    }

    return [formData, handleChange, resetFormData, setFormData];
}


// ========== [///// EXPORTS /////] ==========
export default useFormFields;