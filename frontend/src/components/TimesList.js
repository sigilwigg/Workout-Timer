// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

// ----- locals -----
import { setRecordedTimes } from '../actions/profileActionCreators';

// ----- stylesheets -----
import '../css/times-list.css';
import { calcTimeElapsed } from '../helpers/timeHelpers';


// ========== [///// COMPONENT /////] ==========
const TimesList = () => {
    // ----- non-local state -----
    const { id, selectedWorkout, recordedTimes } = useSelector(store => store.profile);
    const dispatch = useDispatch();

    // ----- useEffect -----
    useEffect(() => {
        dispatch(setRecordedTimes(id))
    }, [])

    // ----- render -----
    return (
        <div className='times-list'>
            {selectedWorkout ?
                <>
                    {
                        recordedTimes.map(time => {
                            if (time.workoutId == selectedWorkout.workoutId) {
                                return (
                                    <div
                                        key={uuid()}
                                        className='time-display'>
                                        <span className='basic-info'>
                                            <p>rounds: {time.rounds.length}</p>
                                            <p>total time: {calcTimeElapsed(time.totalTimeRaw, "display")}</p>
                                        </span>
                                        {time.rounds.map(round => {
                                            return (
                                                <div
                                                    key={uuid()}
                                                    className='round-display'>
                                                    <span className='round-info'>
                                                        <p>round: {round.round}</p>
                                                        <p>time: {calcTimeElapsed(round.totalTimeRaw, "display")}</p>
                                                    </span>
                                                    {round.exercises.map(exercise => {
                                                        return (
                                                            <span
                                                                key={uuid()}
                                                                className='exercise-info'>
                                                                <p>{exercise.reps}</p>
                                                                <p>{exercise.name}</p>
                                                                <p>{calcTimeElapsed(exercise.timeRaw, "display")}</p>
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            }
                        })
                    }

                </>
                : ''
            }
        </div>
    )
}


// ========== [///// EXPORTS /////] ==========
export default TimesList;