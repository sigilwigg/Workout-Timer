// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// ----- locals -----
import WorkoutCarousel from './WorkoutCarousel';
import WorkoutEdit from './WorkoutEdit';

// ----- stylesheets -----
import '../css/workouts.css';


// ========== [///// COMPONENT /////] ==========
const Workouts = () => {
    // ----- non-local state -----
    const { selectedWorkout } = useSelector(store => store.profile);
    const navigate = useNavigate();

    // ----- navigation -----
    function toTimer() {
        navigate('/timer');
    }
    function toMyTimes() {
        navigate('/my-times');
    }

    // ----- render -----
    return (
        <div className='workouts'>
            <WorkoutCarousel />
            <WorkoutEdit />
            {selectedWorkout ?
                <div className='btn-bar'>
                    <button onClick={() => toTimer()}>Start Workout</button>
                    <button onClick={() => toMyTimes()}>
                        View Times
                    </button>
                </div>
                : ''
            }
        </div>
    )
}


// ========== [///// EXPORTS /////] ==========
export default Workouts;