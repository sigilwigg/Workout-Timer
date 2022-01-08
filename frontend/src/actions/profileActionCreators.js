// ========== [///// DEPENDANCIES /////] ==========
// ----- locals -----
import API from '../api/API';


// ========== [///// ACTION CREATORS /////] ==========
// ----- user login/signup -----
export function logIn({ username, password }) {
    return async function (dispatch) {
        try {
            let { token, id } = await API.login(username, password);
            if (!token) throw new Error();
            API.token = token;
            await dispatch(gotProfileLoggedIn());
            await dispatch(updateProfileData(id));
            return ('login success');
        } catch (err) {
            console.log(err.stack);
            return ('login failure');
        }
    }
}

export function signUp(registerData) {
    return async function (dispatch) {
        try {
            let { token, id } = await API.register(registerData);
            if (!token) throw new Error();
            API.token = token;
            await dispatch(gotProfileLoggedIn());
            await dispatch(updateProfileData(id));
            return ('registration success');
        } catch (err) {
            console.log(err.stack);
            return ('registration failure');
        }
    }
}

// ----- get user data and map it to our profile reducer -----
export function updateProfileData(id) {
    return async function (dispatch) {
        try {
            let user = await API.getUser(id);
            console.log(user);
            let workouts = await API.getWorkouts(id);
            console.log(workouts);
            await dispatch(gotUserData(user));
            await dispatch(gotWorkouts(workouts));
        } catch (err) {
            console.log(err.stack);
        }
    }
}

// ----- creating a workout -----
export function createNewWorkout(userId, workoutData) {
    return async function (dispatch) {
        try {
            await API.createWorkout(userId, workoutData);
            let workouts = await API.getWorkouts(userId);
            console.log(workouts);
            await dispatch(gotWorkouts(workouts));
            return ('creation success');
        } catch (err) {
            console.log(err.stack);
            return ('creation failure');
        }
    }
}

// ----- selected workout -----
export function updateSelectedWorkout(selectedWorkout) {
    return async function (dispatch) {
        try {
            await dispatch(gotSelectedWorkout(selectedWorkout));
        } catch (err) {
            console.log(err.stack);
        }
    }
}

export function editSelectedWorkout(userId, workoutId, workoutData) {
    return async function (dispatch) {
        try {
            await API.updateWorkout(userId, workoutId, workoutData)
            await dispatch(gotSelectedWorkout(workoutData));
        } catch (err) {
            console.log(err.stack);
        }
    }
}

export function deleteSelectedWorkout(userId, workoutId) {
    return async function (dispatch) {
        try {
            await API.deleteWorkout(userId, workoutId)
            let workouts = await API.getWorkouts(userId);
            console.log(workouts);
            await dispatch(gotWorkouts(workouts));
        } catch (err) {
            console.log(err.stack);
        }
    }
}

// ----- record a new time and update! -----
export function recordNewTime(id, timeData) {
    return async function (dispatch) {
        try {
            await API.postTime(id, timeData);
            await dispatch(setRecordedTimes(id));
        } catch (err) {
            console.log(err.stack);
        }
    }
}

// ----- user's recorded times -----
export function setRecordedTimes(id) {
    return async function (dispatch) {
        try {
            let times = await API.getTimes(id);
            console.log(times);
            await dispatch(gotRecordedTimes(times));
        } catch (err) {
            console.log(err.stack);
        }
    }
}


// ========== [///// DISPATCH HANDLERS /////] ==========
export function gotUserData({ id, username }) {
    return {
        type: 'SET_USER_DATA',
        id: id,
        username: username
    }
}

export function gotRecordedTimes(recordedTimes) {
    return {
        type: 'SET_RECORDED_TIMES',
        recordedTimes: recordedTimes
    }
}

export function gotWorkouts(workouts) {
    return {
        type: 'SET_WORKOUTS',
        workouts: workouts
    }
}

export function gotSelectedWorkout(selectedWorkout) {
    return {
        type: 'SET_SELECTED_WORKOUT',
        selectedWorkout: selectedWorkout
    }
}

export function gotProfileLoggedIn() {
    return {
        type: 'LOGIN'
    }
}

export function gotProfileLoggedOut() {
    return {
        type: 'LOGOUT'
    }
}
