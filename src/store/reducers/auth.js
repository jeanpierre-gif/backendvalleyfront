import * as actions from '../actions/actionTypes';

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
            ...state,
            isloading:true,
        }
        case actions.LOGIN_SUCCESS:
            return{
                ...state,
                isloading:false,
                success:action.success,
                token:action.token,
                userid:action.userid
            }
          case actions.LOGIN_ERROR:
            return{
                ...state,
                isloading:false,
                error:action.error,
                
            }
        default: return state;

    }

}
export default authReducer;