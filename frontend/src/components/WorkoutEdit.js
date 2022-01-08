// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

// ----- locals -----
import ExerciseSearch from '../components/ExerciseSearch';
import { deleteSelectedWorkout, editSelectedWorkout } from '../actions/profileActionCreators';
import { useNavigate } from 'react-router-dom';

// ----- stylesheets -----
import '../css/workout-edit.css';


// ========== [///// COMPONENT /////] ==========
const WorkoutEdit = () => {
    // ----- non-local state -----
    const { selectedWorkout } = useSelector(store => store.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ----- local state -----
    const [showSearch, setShowSearch] = useState(false);

    // ----- functions -----
    function toggleVisible() {
        setShowSearch(!showSearch)
    }

    async function increaseReps(idx) {
        let updatedSelectedWorkout = selectedWorkout;
        updatedSelectedWorkout.exercises[idx].reps += 5;
        await dispatch(editSelectedWorkout(
            selectedWorkout.userId,
            selectedWorkout.workoutId,
            updatedSelectedWorkout))
    }

    async function decreaseReps(idx) {
        let updatedSelectedWorkout = selectedWorkout;
        if (updatedSelectedWorkout.exercises[idx].reps <= 5) return;
        updatedSelectedWorkout.exercises[idx].reps -= 5;
        await dispatch(editSelectedWorkout(
            selectedWorkout.userId,
            selectedWorkout.workoutId,
            updatedSelectedWorkout))
    }

    async function increaseRestTime() {
        let updatedSelectedWorkout = selectedWorkout;
        updatedSelectedWorkout.exercises[0].restTimeSecs += 5;
        await dispatch(editSelectedWorkout(
            selectedWorkout.userId,
            selectedWorkout.workoutId,
            updatedSelectedWorkout))
    }

    async function decreaseRestTime() {
        let updatedSelectedWorkout = selectedWorkout;
        if (updatedSelectedWorkout.exercises[0].restTimeSecs == 0) return;
        updatedSelectedWorkout.exercises[0].restTimeSecs -= 5;
        await dispatch(editSelectedWorkout(
            selectedWorkout.userId,
            selectedWorkout.workoutId,
            updatedSelectedWorkout))
    }

    async function increaseRounds() {
        let updatedSelectedWorkout = selectedWorkout;
        updatedSelectedWorkout.rounds += 1;
        await dispatch(editSelectedWorkout(
            selectedWorkout.userId,
            selectedWorkout.workoutId,
            updatedSelectedWorkout))
    }

    async function decreaseRounds() {
        let updatedSelectedWorkout = selectedWorkout;
        if (updatedSelectedWorkout.rounds == 0) return;
        updatedSelectedWorkout.rounds -= 1;
        await dispatch(editSelectedWorkout(
            selectedWorkout.userId,
            selectedWorkout.workoutId,
            updatedSelectedWorkout))
    }

    async function addToWorkout(exercise) {
        let updatedSelectedWorkout = selectedWorkout;
        let newExercise = {
            name: exercise.name,
            reps: 15
        }

        updatedSelectedWorkout.exercises.push(newExercise);
        await dispatch(editSelectedWorkout(
            selectedWorkout.userId,
            selectedWorkout.workoutId,
            updatedSelectedWorkout))

        setShowSearch(false);
    }

    async function removeFromWorkout(index) {
        let updatedSelectedWorkout = selectedWorkout;
        updatedSelectedWorkout.exercises = updatedSelectedWorkout.exercises.filter((val, idx) => {
            return idx != index;
        })
        await dispatch(editSelectedWorkout(
            selectedWorkout.userId,
            selectedWorkout.workoutId,
            updatedSelectedWorkout))
    }

    async function deleteWorkout() {
        let res = await dispatch(deleteSelectedWorkout(selectedWorkout.userId, selectedWorkout.workoutId))
    }

    // ----- navigation -----
    function toCreateWorkout() {
        navigate('/create-workout')
    }


    // ----- render -----
    return (
        <div className='workout-edit'>
            {selectedWorkout ? (
                <>
                    <span className='rounds-display'>
                        <h4>Rounds:</h4>
                        <button
                            onClick={() => decreaseRounds()}>
                            -
                        </button>
                        <h4>{selectedWorkout.rounds}</h4>
                        <button
                            onClick={() => increaseRounds()}>
                            +
                        </button>
                    </span>
                    <span className='rest-time-display'>
                        <h4>Rest Time:</h4>
                        <button
                            onClick={() => decreaseRestTime()}>
                            -
                        </button>
                        <h4>{selectedWorkout.exercises[0].restTimeSecs}</h4>
                        <button
                            onClick={() => increaseRestTime()}>
                            +
                        </button>
                    </span>
                    <div className='exercise-edit'>
                        {selectedWorkout.exercises.map((exercise, idx) => {
                            if (exercise.name != "rest")
                                return (
                                    <div
                                        key={uuid()}
                                        className='list-item'>
                                        <p>{exercise.name}</p>
                                        <span>
                                            <button
                                                onClick={() => decreaseReps(idx)}>
                                                -
                                            </button>
                                            <p>{exercise.reps}</p>
                                            <button
                                                onClick={() => increaseReps(idx)}>
                                                +
                                            </button>
                                            <button
                                                onClick={() => removeFromWorkout(idx)}
                                                className='trash'>
                                                &#x26CC;
                                            </button>
                                        </span>
                                    </div>
                                )
                        })}
                    </div>
                    <div className='btn-bar'>
                        <button
                            onClick={() => deleteWorkout()}
                            className='delete-workout'>
                            Delete Workout
                        </button>
                        <button
                            onClick={() => toggleVisible()}
                            className='add-exercise'>
                            Add Exercise
                        </button>
                        <button
                            onClick={() => toCreateWorkout()}
                            className='create-workout'>
                            Create Workout
                        </button>
                    </div>
                    <ExerciseSearch
                        toggleVisible={toggleVisible}
                        show={showSearch}
                        addToWorkout={addToWorkout}
                    />
                </>
            )
                : <div className='btn-bar'>
                    <button
                        onClick={() => toCreateWorkout()}
                        className='create-workout'>
                        Create Workout
                    </button>
                </div>}
        </div>
    )
}


// ========== [///// EXPORTS /////] ==========
export default WorkoutEdit;