import * as actionTypes from './actionTypes';

export const loginStart = ()=>{
    return{
        type:actionTypes.LOGIN_START,
    }
}

export const loginSuccess = (token, userid,success)=>{
    return{
        type:actionTypes.LOGIN_SUCCESS,
        token:token,
        userid:userid,
        success:success
    }
}
export const loginFailed = (error)=>{
    return{
        type:actionTypes.LOGIN_ERROR,
        error:error
    }
}

//async
export const loginRequest = (email,password)=>{
    return async (dispatch)=>{
        dispatch(loginStart());
        const loginBody = {
            email: email,
            password: password
        }
        console.log(loginBody);
       const response= await fetch('https://localhost:44390/api/Account/Login',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(loginBody)
        })

        const data =await response.json();
        
        if(response.ok && data.status){
            dispatch(loginSuccess(data.data.token,data.data.Id,data.message))
        }else{
            dispatch(loginFailed(data.message));
        }
    }
}