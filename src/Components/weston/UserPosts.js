import React, { useState, useEffect } from 'react'
// import { UserContext } from '../../App'
import axios from 'axios'
import {API} from '../../App'
import { Link } from 'react-router-dom'

const UserPosts = (props) => {
    // console.log(props.match.params.user)

    const [ posts, setPosts ] = useState([])
    // const [profiles, setProfiles] = useState([])

    useEffect(() => {
        axios.get(`${API}/posts/days`, {
            headers: {"auth-token": localStorage.getItem("auth-token")}
        })
        .then(res => setPosts(res.data))
    }, [])

    return (
        <div className="userprof-container">
            <div>
            <h3>{props.match.params.user}</h3>
            </div>
            <h4>{props.match.params.user}'s Posts</h4> 
            {posts.map((post) => {
                if(props.match.params.user === post.postedBy) {
                    return (
                        <div className="post-container">
                        <Link to={`/profile/${post.postedBy}`} name={post.postedBy} className="username">{post.postedBy}</Link>
                        <p className="timestamp">{post.date}</p>
                        <hr></hr>
                        <p className="instance-text">{post.instance}</p>
                        </div>
                    )
                }  
            })}
        </div>
    )
}

export default UserPosts
