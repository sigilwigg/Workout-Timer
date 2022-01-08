// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


// ========== [///// COMPONENT /////] ==========
const RequireAuth = () => {
    const profile = useSelector(store => store.profile);

    return (profile.isLoggedIn ? <Outlet /> : <Navigate to={{ pathname: '/' }} />)
}


// ========== [///// EXPORTS /////] ==========
export default RequireAuth;