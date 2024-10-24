import React, { useState } from "react";
import './Login.css';
import * as actions from '../../store/actions/index'; // Adjust the path as needed
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const { isLoading, error } = authState;

    // State to hold email and password
    const [initialValues, setInitialValues] = useState({
        email: '',
        password: '',
    });

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex

       if(regex.test(email)){
        return true;
       }
       alert('Invalid email format');

    }
    const validatePassword = (password) => {
     if(password.trim().length > 4){
        return true;
     }
     alert('password needs to be longer')

    }
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const { email, password } = initialValues; // Get email and password from state
        if(!email || !password) {
            alert("please enter all fields")
        }
        else{
        if(validateEmail(email) && validatePassword(password))
       {
        dispatch(actions.loginRequest(email, password )); // Dispatch the login action
       }
        }

        console.log(email, password);
    };
     
    return (
        <div className="LoginPage">
            <div className="LoginDiv">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputdiv">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={initialValues.email} // Controlled input
                            onChange={(e) => 
                                setInitialValues(prevValues => ({
                                    ...prevValues,
                                    email: e.target.value // Update email directly
                                }))
                            }
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={initialValues.password} // Controlled input
                            onChange={(e) => 
                                setInitialValues(prevValues => ({
                                    ...prevValues,
                                    password: e.target.value // Update password directly
                                }))
                            }
                        />
                        <button type="submit" disabled={isLoading}>Submit</button> {/* Disable while loading */}
                    </div>
                    {error && <p className="error-message">{error}</p>} {/* Show error message if exists */}
                </form>
            </div>
        </div>
    );
};

export default Login;
