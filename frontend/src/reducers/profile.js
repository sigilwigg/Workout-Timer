// ========== [///// INITIAL STATE /////] ==========
const INITIAL_STATE = {
    // ----- user info -----
    username: "",
    id: 0,
    isLoggedIn: false,

    // ----- workouts -----
    workouts: [],
    selectedWorkout: undefined,

    // ----- times -----
    recordedTimes: [],
}


// ========== [///// REDUCER /////] ==========
function profile(state = INITIAL_STATE, action) {

    switch (action.type) {
        // ----- login/logout -----
        case 'LOGIN':
            return { ...state, isLoggedIn: true };
        case 'LOGOUT':
            return INITIAL_STATE;

        // ----- user data -----
        case 'SET_USER_DATA':
            return { ...state, id: action.id, username: action.username };

        // ----- workouts -----
        case 'SET_WORKOUTS':
            return { ...state, workouts: action.workouts };
        case 'SET_SELECTED_WORKOUT':
            return { ...state, selectedWorkout: action.selectedWorkout };

        // ----- recorded times -----
        case 'SET_RECORDED_TIMES':
            return { ...state, recordedTimes: action.recordedTimes };

        // ----- default -----
        default:
            return state;
    }

}


// ========== [///// EXPORTS /////] ==========
export default profile;