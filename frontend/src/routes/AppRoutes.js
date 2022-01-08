// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// ----- locals -----
// route-specific
import RequireAuth from './RequireAuth';
import RouteNotFound from './RouteNotFound';

// components
import SignIn from '../components/SignIn';
import Signup from '../components/SignUp';
import Workouts from '../components/Workouts';
import Times from '../components/Times';
import Timer from '../components/Timer';
import CreateWorkout from '../components/CreateWorkout';



// ========== [///// COMPONENT /////] ==========
const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<RequireAuth />}>
                <Route path='/my-workouts' element={<Workouts />} />
                <Route path='/my-times' element={<Times />} />
                <Route path='/timer' element={<Timer />} />
                <Route path='/create-workout' element={<CreateWorkout />} />
            </Route>
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<SignIn />} />
            <Route path="*" element={<RouteNotFound />} />
        </Routes>
    )
}


// ========== [///// EXPORTS /////] ==========
export default AppRoutes;