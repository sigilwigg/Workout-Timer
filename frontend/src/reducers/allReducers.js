// ========== [///// DEPENDANCIES /////] ==========
import { combineReducers } from 'redux';
import profile from './profile';


// ========== [///// MAIN /////] ==========
const allReducers = combineReducers({
    profile: profile,
})


// ========== [///// EXPORTS /////] ==========
export default allReducers; 