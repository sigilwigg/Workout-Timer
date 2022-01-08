// ========== [///// DIPENDANCIES /////] ==========
// ----- libraries -----
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewWorkout } from '../actions/profileActionCreators';

// ----- locals -----
import useFormFields from '../hooks/useFormFields';


// ========== [///// COMPONENT /////] ==========
const CreateWorkout = () => {
    // ----- non-local state -----
    const profile = useSelector(store => store.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ----- local state -----
    const [formData, handleChange] = useFormFields({
        name: '',
        userId: profile.id,
        username: profile.username,
        rounds: 1,
        exercises: [{
            "name": "rest",
            "restTimeSecs": 20
        }]
    })

    // ----- form submission -----
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            let res = await dispatch(createNewWorkout(profile.id, formData));
            if (res === 'creation failure') throw new Error(res);
            if (res === 'creation success') toWorkouts();
        } catch (err) {
            alert(err);
            console.log(err.stack);
        }
    }

    // ----- navigation -----
    function toWorkouts() {
        navigate('/my-workouts')
    }

    // ----- render -----
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <li>
                    <label htmlFor='workoutName'>Workout Name: </label>
                    <input
                        id='workoutName'
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                    />
                </li>
                <button>Create Workout!</button>
            </form>
            <button onClick={() => toWorkouts()}>Cancel</button>
        </div>
    )
}


// ========== [///// EXPORTS /////] ==========
export default CreateWorkout;