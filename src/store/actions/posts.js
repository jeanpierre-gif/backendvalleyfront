import * as actionTypes from './actionTypes';

export const getPostsRequest = () => {
    return {
        //return action type to indicate request has started
        type: actionTypes.GET_POSTS_REQUEST,
    };
};
//action creator for successful retrieval of posts
export const getPostsSuccess = (posts, searchQuery) => {
    return {
        type: actionTypes.GET_POSTS_SUCCESS,
        posts: posts,//the fetched posts
        searchQuery: searchQuery//the search query used if any 
    };
};

export const getPostFailed = (error, searchQuery) => {
    return {
        type: actionTypes.GET_POSTS_ERROR,
        error: error,
        searchQuery: searchQuery 
    };
};

//async function:fetchPosts to include pageSize and currentPage
export const fetchPosts = (searchQuery, pageSize, currentPage) => {
    return async (dispatch) => {
        //dispatch to indicate request has started
        dispatch(getPostsRequest());
        // different urls based on whether searchQuery exists
        const url = searchQuery 
        ? `https://jsonplaceholder.typicode.com/posts?q=${searchQuery}` 
        : `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${pageSize}`;
        
        try {
            //fetch posts from the urls constructed above
            const response = await fetch(url);
            //parse the response as json
            const data = await response.json();
            
            if (data.length > 0) {
                dispatch(getPostsSuccess(data, searchQuery));
            } else {
                dispatch(getPostFailed('No posts found', searchQuery));
            }
        } catch (error) {
            dispatch(getPostFailed('Error fetching posts', searchQuery));
        }
    };
};
