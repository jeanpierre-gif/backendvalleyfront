import * as actionTypes from './actionTypes';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
//secret key used for encrypting the token
const secretKey = 'YourSuperSecretKeyThatIsAtLeast64CharactersLong12345678901234567890'; 
//action creator for starting the login process
export const loginStart = () => ({
    //return action type to indicate login has started
    type: actionTypes.LOGIN_START,
});

export const loginSuccess = (token, userid, success) => {
    //encrypt the token
    const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
    //save the token in cookies
    Cookies.set('token', encryptedToken, { expires: 7, secure: true, sameSite: 'Strict' });
    
    return {
        type: actionTypes.LOGIN_SUCCESS,//return the action type for the login success
        token: token,//the token received from the server
        userid: userid,
        success: success,
    };
};

export const loginFailed = (error) => ({
    type: actionTypes.LOGIN_ERROR,
    error: error,
});

// Async function to send a request
export const loginRequest = (email, password) => {
    return async (dispatch) => {
        try {
            //dispatch action to indicate the login process has started
            dispatch(loginStart());
            const loginBody = {
                email: email,
                password: password,
            };
            console.log(loginBody);

            // Send the request
            const response = await fetch('https://localhost:44390/api/Account/Login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginBody),
            });
            //parse the response data as json
            const data = await response.json();

            if (response.ok && data.status) {
                // If the user entered correct credentials
                console.log(data);
                //dispatch success with the data received
                dispatch(loginSuccess(data.data.token, data.data.id, data.message));
            } else {
                // If not, display error message from the response
                dispatch(loginFailed(data.message));
            }
        } catch (e) {
            console.error("Login error:", e); // Log the actual error
            dispatch(loginFailed("An error occurred while logging in."));
        }
    };
};
