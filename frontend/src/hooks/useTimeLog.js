// ========== [ ///// DEPENDANCIES ///// ] ==========
// ----- libraries -----
import React, { useState } from 'react';

// ----- locals -----
import { calcTimeElapsed } from '../helpers/timeHelpers';


// ========== [///// HOOK /////] ==========
const useTimeLog = (initialState) => {
    const [log, setLog] = useState(initialState);

    const logBasicData = (userId, workoutId) => {
        setLog(log => ({ ...log, userId: userId, workoutId: workoutId }))
    }

    const logExerciseTime = (round, exerciseData) => {
        setLog(log => ({
            ...log,
            rounds: {
                ...log.rounds,
                [round]: {
                    ...log.rounds[round],
                    exercises: [
                        ...log.rounds[round].exercises,
                        {
                            name: exerciseData.name,
                            reps: exerciseData.reps,
                            timeRaw: exerciseData.elapsed,
                            time: calcTimeElapsed(exerciseData.elapsed)
                        }
                    ]
                }
            }
        }))
    }

    const logRoundTime = (round, timeData) => {
        setLog(log => ({
            ...log,
            rounds: {
                ...log.rounds,
                [round]: {
                    ...log.rounds[round],
                    totalTimeRaw: timeData,
                    totalTime: calcTimeElapsed(timeData)
                }
            }
        }))
    }

    const logWorkoutTime = (startTime, completedTime) => {
        setLog(log => ({
            ...log,
            startTime: startTime,
            totalTimeRaw: completedTime,
            totalTime: calcTimeElapsed(completedTime)
        }))
    }

    const createNewRound = (round) => {
        setLog(log => ({
            ...log,
            rounds: {
                ...log.rounds,
                [round]: {
                    round: round,
                    totalTimeRaw: 0,
                    totalTime: {},
                    exercises: []
                }
            }
        }))
    }

    return [log, logBasicData, logExerciseTime, logRoundTime, logWorkoutTime, createNewRound];
}


// ========== [///// EXPORTS /////] ==========
export default useTimeLog;