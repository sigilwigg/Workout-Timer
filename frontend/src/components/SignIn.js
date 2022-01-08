// ========== [///// DIPENDANCIES /////] ==========
// ----- libraries -----
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// ----- locals -----
import { logIn } from '../actions/profileActionCreators';
import useFormFields from '../hooks/useFormFields';

// ----- stylesheets -----
import '../css/signin-signup.css';


// ========== [///// COMPONENT /////] ==========
const SignIn = () => {
    // ----- non-local state -----
    const profile = useSelector(store => store.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ----- local state -----
    const [formData, handleChange] = useFormFields({
        username: '',
        password: ''
    })

    // ----- the func-bunch -----
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            let res = await dispatch(logIn(formData));
            if (res === 'login failure') throw new Error(res);
            if (res === 'login success') toWorkouts();
        } catch (err) {
            alert(err);
            console.log(err.stack);
        }
    }

    // ----- navigation -----
    function toSignup() {
        navigate('/signup')
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
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <li>
                    <label htmlFor='username'>Username: </label>
                    <input
                        id='username'
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                    />
                </li>
                <li>
                    <label htmlFor='password'>Password: </label>
                    <input
                        id='password'
                        type='text'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </li>
                <button>Log In</button>
            </form>
            <button onClick={() => toSignup()}>Signup</button>
        </div>
    )
}


// ========== [///// EXPORTS /////] ==========
export default SignIn;