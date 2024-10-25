import * as actions from '../actions/actionTypes';
//initial state for the authentication reducer
const initialState={
    token:null,
    userid:null,
    error:null,
    success:null,
    isloading:false
}

 const authReducer = (state=initialState,action) => {
  
    switch (action.type) {
      case actions.LOGIN_START:
        return{
            //here we are creating a copy of the current state
            //this ensures that we keep all existing properties of the state while only changing specific ones
            ...state,//keep existing state
            isloading:true,//set loading true
        }
        case actions.LOGIN_SUCCESS:
            return{
            //since we got the response,loading should be done because we got the response
                ...state,
                isloading:false,//set loading to false
                success:action.success,
                token:action.token,//store the received token
                userid:action.userid//store the userid
            }
          case actions.LOGIN_ERROR:
            return{
                ...state,
                isloading:false,
                error:action.error,//store the error message from action
                
            }
        default: return state;//return the current state if action type does not match

    }

}
export default authReducer;