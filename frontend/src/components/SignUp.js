// ========== [///// DIPENDANCIES /////] ==========
// ----- libraries -----
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// ----- locals -----
import { signUp } from '../actions/profileActionCreators';
import useFormFields from '../hooks/useFormFields';

// ----- stylesheets -----
import '../css/signin-signup.css';


// ========== [///// COMPONENT /////] ==========
const Signup = () => {
    // ----- non-local state -----
    const profile = useSelector(store => store.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ----- local state -----
    const [formData, handleChange] = useFormFields({
        username: '',
        password: ''
    })

    // ----- form submition -----
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            let res = await dispatch(signUp(formData));
            if (res === 'registration failure') throw new Error(res);
            if (res === 'registration success') toWorkouts();
        } catch (err) {
            alert(err);
            console.log(err.stack);
        }
    }

    // ----- navigation -----
    function toLogin() {
        navigate('/')
    }
    function toWorkouts() {
        navigate('/my-workouts')
    }

    // ----- use effect -----
    useEffect(() => {
        // if user is already logged in -> redirect to workouts
        if (profile.isLoggedIn) toWorkouts();
    })

    // ----- render -----
    return (
        <div className="form-container signup">
            <form onSubmit={handleSubmit}>
                <li>
                    <label htmlFor='username'>New Username: </label>
                    <input
                        id='username'
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                    />
                </li>
                <li>
                    <label htmlFor='password'>New Password: </label>
                    <input
                        id='password'
                        type='text'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </li>
                <button>Sign Up!</button>
            </form>
            <button onClick={() => toLogin()}>Back</button>
        </div>
    )
}


// ========== [///// EXPORTS /////] ==========
export default Signup;