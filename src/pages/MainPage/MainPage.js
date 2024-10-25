import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions/index';
import './MainPage.css';
const MainPage = () => {
    const dispatch = useDispatch();
    const postState = useSelector((state) => state.post);
    const { isloading, posts, error, searchHistory } = postState;
    const [searchQuery, setSearchQuery] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // track current page
    const pageSize = 10; // number of posts per page

    // fetch posts when the component mounts or when currentpage changes (not during search)
    useEffect(() => {
        if (!searchQuery) {
            dispatch(actions.fetchPosts('', pageSize, currentPage));
        }
    }, [dispatch, currentPage, searchQuery]);

    // Infinite scroll effect
    const handleScroll = useCallback(() => {
        if (!searchQuery && window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
            setCurrentPage(prevPage => prevPage + 1); // increment page number
        }
    }, [searchQuery]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(actions.fetchPosts(searchQuery.trim(), pageSize, 1)); // fetch posts based on search query
    };

    return (
        <div className="main-page">
            <form onSubmit={handleSearch} className="search-form">
            <input 
                    placeholder="Search" 
                    name="searchquery"  
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    type="text" 
                    onFocus={() => setIsInputFocused(true)} 
                    onBlur={() => setIsInputFocused(false)}
                    className="search-input"
                />
                <button type="submit" className="search-button">Submit</button>
            </form>

            {isInputFocused && searchHistory.length > 0 && (
                <div className="search-history">
                    {searchHistory.map((term, index) => (
                        <div key={index} className="history-item" onClick={() => { setSearchQuery(term); handleSearch(); }}>
                            {term}
                        </div>
                    ))}
                </div>
            )}
            <ul>
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map(post => (
                        <li key={post.id}>{post.body}</li>
                    ))
                ) : (
                    <p>No posts found.</p>
                )}
            </ul>

            {isloading && <p>Loading...</p>}

            <div style={{
                position: "fixed",
                bottom: "10px",
                right: "10px",
                backgroundColor: "white",
                border: "1px solid #ccc",
                padding: "5px",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
            }}>
                    <p>Total Posts: {posts.length}</p>
                
            </div>
        </div>
    );
};

export default MainPage;
