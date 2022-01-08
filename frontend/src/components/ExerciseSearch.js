// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

// ----- locals -----
import API from '../api/API';

// ----- stylesheets -----
import '../css/exercise-search.css';
import useFormFields from '../hooks/useFormFields';


// ========== [///// COMPONENT /////] ==========
const ExerciseSearch = ({ toggleVisible, show, addToWorkout }) => {
    // ----- local state -----
    const [exerciseList, setExerciseList] = useState([]);
    const [formData, handleChange] = useFormFields({
        search: ''
    })

    // ----- functions! -----
    async function getExercises() {
        let exercises = await API.getExercises(formData.search);
        setExerciseList(exercises);
    }

    // ----- use effect -----
    useEffect(() => {
        getExercises();
    }, [formData])


    // ----- render -----
    return (
        <div className={`exercise-search ${show == true ? 'visible' : 'hidden'}`} >
            <div className='top-bar'>
                <input
                    id="exercise-search"
                    type="text"
                    name="search"
                    placeholder='search'
                    value={formData.search}
                    onChange={handleChange}
                />
                <div
                    onClick={() => toggleVisible()}
                    className='close-search' />
            </div>
            <div className='exercise-list'>
                {exerciseList.map(exercise => {
                    return (
                        <div
                            key={uuid()}
                            className='list-item'>
                            <p>{exercise.name}</p>
                            <span>
                                <button
                                    onClick={() => addToWorkout(exercise)}>
                                    ADD
                                </button>
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


// ========== [///// EXPORTS /////] ==========
export default ExerciseSearch;