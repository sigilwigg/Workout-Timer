// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// ----- locals -----
import useTimer from "../hooks/useTimer";
import useTimeLog from '../hooks/useTimeLog';
import { calcTimeElapsed } from "../helpers/timeHelpers";
import { recordNewTime } from "../actions/profileActionCreators";

// ----- stylesheets -----
import "../css/timer.css";


// ========== [///// COMPONENT /////] ==========
function Timer() {
    // ----- non-local state -----
    const { selectedWorkout } = useSelector(store => store.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ----- local state -----
    const [complete, setComplete] = useState(false);
    const [paused, setPaused] = useState(false);
    const [timer, updateTimer, clearTimeElapsed] = useTimer({
        rest: { restTime: 0 },
        workout: { start: undefined, elapsed: 0 },
        round: { number: undefined, elapsed: 0 },
        exercise: { number: undefined, name: undefined, reps: undefined, elapsed: 0 }
    })
    const [log, logBasicData, logExerciseTime, logRoundTime, logWorkoutTime, createNewRound] = useTimeLog({
        startTime: undefined,
        totalTime: undefined,
        userId: undefined,
        workoutId: undefined,
        rounds: {}
    })

    // ----- funcs -----
    function timerStart() {
        updateTimer("workout", "start", new Date);
        updateTimer("round", "number", 1);
        updateTimer("exercise", "number", 1);
        updateTimer("exercise", "name", selectedWorkout.exercises[1].name);
        updateTimer("exercise", "reps", selectedWorkout.exercises[1].reps);

        let restTimeInCintiSeconds =
            updateTimer("rest", "restTime", (selectedWorkout.exercises[0].restTimeSecs * 100 * 10));

        logBasicData(selectedWorkout.userId, selectedWorkout.workoutId);
        createNewRound(1);
    }

    function timerNext() {
        // ----- if round is complete -----
        if (timer.exercise.number == selectedWorkout.exercises.length - 1) {
            // if the workout is over
            if (timer.round.number == selectedWorkout.rounds) {
                // log times
                logExerciseTime(timer.round.number, timer.exercise);
                logRoundTime(timer.round.number, timer.round.elapsed);
                logWorkoutTime(timer.workout.start, timer.workout.elapsed);

                setComplete(true);
                return;
            }

            // log times
            logExerciseTime(timer.round.number, timer.exercise);
            logRoundTime(timer.round.number, timer.round.elapsed);

            // clear timer
            clearTimeElapsed("round");
            clearTimeElapsed("exercise");

            // update to next round
            createNewRound(timer.round.number + 1);
            updateTimer("round", "number", timer.round.number + 1);
            updateTimer("exercise", "number", 0)
            updateTimer("exercise", "name", selectedWorkout.exercises[0].name);

            return;
        }

        // ----- if round not complete -----
        // log times
        if (timer.exercise.name != "rest") {
            logExerciseTime(timer.round.number, timer.exercise);
        }

        // clear timer
        clearTimeElapsed("exercise");

        // update to next exercise
        updateTimer("exercise", "name", selectedWorkout.exercises[timer.exercise.number + 1].name);
        updateTimer("exercise", "reps", selectedWorkout.exercises[timer.exercise.number + 1].reps);
        updateTimer("exercise", "number", timer.exercise.number + 1)

        return;
    }

    function getCountDown() {
        let countDown = Math.floor((timer.rest.restTime - timer.exercise.elapsed) / 1000);
        if (countDown <= 0) {
            timerNext();
            return '';
        }

        return countDown;
    }

    function pause() {
        setPaused(!paused);
    }

    // ----- navigation -----
    function toWorkouts() {
        navigate('/my-workouts')
    }
    function toMyTimes() {
        navigate('/my-times');
    }

    // ----- timer loop -----
    useEffect(() => {
        if (complete || !timer.workout.start || paused) return;

        const interval = setInterval(() => {
            updateTimer("workout", "elapsed", timer.workout.elapsed + 100);
            updateTimer("round", "elapsed", timer.round.elapsed + 100);
            updateTimer("exercise", "elapsed", timer.exercise.elapsed + 100);
        }, 100);

        return () => { clearInterval(interval); };
    });


    // ----- post those times! -----
    useEffect(() => {
        if (!complete) return;

        let newRecordedTime = log;
        let rounds = [];
        newRecordedTime.restTime = selectedWorkout.exercises[0].restTimeSecs;
        // quick conversion to array
        for (let key in newRecordedTime.rounds) {
            rounds.push(newRecordedTime.rounds[key]);
        }
        newRecordedTime.rounds = rounds;

        dispatch(recordNewTime(selectedWorkout.userId, newRecordedTime));
    }, [complete]);

    // ----- render -----
    return (
        <div className="timer">
            <div className="workout-title">
                <h1>{selectedWorkout.name}</h1>
                <div>{timer.workout.start ?
                    <div>
                        <h3>{calcTimeElapsed(timer.workout.elapsed, "display")}</h3>
                        <h2>round {timer.round.number}/{selectedWorkout.rounds}:</h2>
                        <h3>{calcTimeElapsed(timer.round.elapsed, "display")}</h3>
                    </div>

                    : "ready, set ..."}</div>
            </div>
            <div
                className="big-friendly-circle"
                style={timer.exercise.name != "rest" ? { backgroundColor: "#00ff66" } : { backgroundColor: "#42B1FF" }}
            >
                {!complete ?
                    timer.workout.start ?
                        <div className="circle-text">
                            <div className="cur-reps">
                                <div>
                                    <h3>CURRENT:</h3>
                                    <h3>{timer.exercise.name}</h3>
                                </div>
                                <div>
                                    {timer.exercise.name == "rest" ?
                                        <>
                                            <h3>REST TIME:</h3>
                                            <h3>{
                                                selectedWorkout.exercises[0].restTimeSecs
                                            } secs</h3>
                                        </>
                                        :
                                        <>
                                            <h3>REPS:</h3>
                                            <h3>{timer.exercise.reps}</h3>
                                        </>
                                    }

                                </div>
                            </div>

                            <h1 className="cur-time">
                                {timer.exercise.name == "rest" ?
                                    getCountDown()
                                    : calcTimeElapsed(timer.exercise.elapsed, "display")}
                            </h1>

                            <h3 className="next">
                                UP NEXT: {timer.exercise.number == selectedWorkout.exercises.length - 1
                                    ? timer.round.number == selectedWorkout.rounds ? "completeness" : selectedWorkout.exercises[0].name
                                    : selectedWorkout.exercises[timer.exercise.number + 1].name}
                            </h3>
                        </div>
                        : ''
                    : <h1 className="complete">WORKOUT COMPLETE!</h1>
                }
            </div>
            {!complete ?
                <>
                    <button
                        className="next-btn"
                        onClick={
                            timer.workout.start ?
                                () => timerNext()
                                : () => timerStart()}>
                        {timer.workout.start ? "NEXT" : "START"}
                    </button>
                    <button
                        className="pause-btn"
                        onClick={() => pause()}>
                        pause
                    </button>
                </>
                : <div className="is-complete-btns">
                    <button onClick={() => toWorkouts()}>Back To Workouts</button>

                    <button onClick={() => toMyTimes()}>View My Times</button>
                </div>
            }

        </div>
    );
}


// ========== [///// EXPORTS /////] ==========
export default Timer;