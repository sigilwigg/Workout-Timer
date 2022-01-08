// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// ----- locals -----
import WorkoutCarousel from './WorkoutCarousel';
import TimesList from './TimesList';

// ----- stylesheets -----
import '../css/times.css';


// ========== [///// COMPONENT /////] ==========
const Times = () => {
    // ----- non-local state -----
    const { selectedWorkout } = useSelector(store => store.profile);
    const navigate = useNavigate();

    // ----- navigation -----
    function toWorkouts() {
        navigate('/my-workouts')
    }

    // ----- render -----
    return (
        <div className='times'>
            <WorkoutCarousel />
            <TimesList />
            {selectedWorkout ?
                <div className='btn-bar'>
                    <button onClick={() => toWorkouts()}>Back</button>
                </div>
                : ''
            }
        </div>
    )
}


// ========== [///// EXPORTS /////] ==========
export default Times;