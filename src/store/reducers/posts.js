import * as actionTypes from '../actions/actionTypes';

const initialState = {
    searchHistory: [],
    posts: [],
    error: null,
    isloading: false
}

const postReducer = (state = initialState, action) => {
    switch(action.type) {
        //when a request to get a post has been initiated
        case actionTypes.GET_POSTS_REQUEST:
            return {
                //spread the current state and set the loading to true 
                ...state,
                isloading: true
            };
            //when posts are successfully fetched

        case actionTypes.GET_POSTS_SUCCESS:
            return {
                //since we got the response,loading should be done because we got the posts
                ...state,
                isloading: false,
                //if the user was searching, we set the post array to the one we got, orwe replace it to the one we searched for if there exist one
                posts: action.searchQuery ? action.posts : [...state.posts, ...action.posts], //add posts if not searching
                //append new search history to the old ones in the state
                searchHistory: action.searchQuery ? [...state.searchHistory, action.searchQuery] : state.searchHistory
            };

            //when we get an error
        case actionTypes.GET_POSTS_ERROR:
            return {
                //set loading false because we got the response
                ...state,
                isloading: false,
                //reset the array because we didnt get one
                posts: [],
                //add search to the history if any
                searchHistory: action.searchQuery ? [...state.searchHistory, action.searchQuery] : state.searchHistory
            };
            //if the action type is not recognized,return the current state

        default:
            return state;
    }
};

export default postReducer;
