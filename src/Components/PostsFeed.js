import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import NewPost from './NewPost';
import { Link } from 'react-router-dom'
import { UserContext } from '../App.js'
import {API} from '../App'


const PostsFeed = () => {
    const { userData, setUserData } = useContext(UserContext)

    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get(`${API}/posts/days`, {
            headers: {"auth-token": localStorage.getItem("auth-token")}
        })
        .then(res => setPosts(res.data))
    }, [])

    return (
        <div className="all-posts-container">
            <UserContext.Provider value={{ userData, setUserData }}> 
            {userData.user ? (
                <div key={userData.user}>
                    <NewPost setPosts={setPosts} />
                    <h4>Posts</h4>
                    <div>{
                        posts.map(post => {
                        // console.log(post)
                        return (
                            <div className="post-container" key={post._id}>
                                <div className="top-post" key={userData.user.name}>
                                    <div className="name-time">
                                        {userData.user.name === post.postedBy ?
                                        <Link to={`/userprofile/${post.postedBy}`} name={post.postedBy} className="username">{post.postedBy}</Link>
                                        :
                                        <Link to={`/profile/${post.postedBy}`} name={post.postedBy} className="username">{post.postedBy}</Link>
                                        }
                                        <div className='time'>
                                        <span className="timestamp">{new Date(post.date).getHours()}:{new Date(post.date).getMinutes()}</span>
                                        <p className="timestamp">{new Date(post.date).toDateString()}</p>
                                        </div>    
                                    </div>
                                </div>
                                    <p className="instance-text">{post.instance}</p>
                            </div>
                        )
                    })

                    }</div>
                </div>
            ) :
            (
                <div>
                    <p>Please Log In: <Link to="/login">Login</Link></p>
                </div>
            )
            }
            </UserContext.Provider> 
        </div>
    )
}

export default PostsFeed
