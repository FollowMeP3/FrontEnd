import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Posts = () => {
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/posts/days', {
            headers: {"auth-token": localStorage.getItem("auth-token")}
        })
        .then(res => setPosts(res.data))
    }, [])
    return (
        <div>
            <h3>
                Posts
            </h3>
              <ul>
                {posts.map(post => {
                    return (
                    <li>{post.instance}: {post.postedBy}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Posts
