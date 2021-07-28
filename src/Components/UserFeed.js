import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import NewPost from './NewPost';

const UserFeed = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetchAllPosts()
    }, [])

    const fetchAllPosts = () => {
        fetch('http://localhost:5000/posts/days')
          .then(res => res.json())
          .then(res => {
            console.log(res)
            setPosts(res)
          })
          .catch(err => {
            console.error(err);
          });
      }
    
    function deletePost(id) {
        axios.delete(`/${id}`)
        alert("item deleted")
        console.log(`deleted post with id of ${id}`)
    }

    function openEdit(id) {
        setPosts(() => {
            return {
                ...posts,
                id:id,
            }
        })
    }

    let allPosts = posts.map(post => {
        return (
            <div className="post-content">
                <p>{post.instance}</p>
                <img src={post.imageUpload} alt=""/>
                <button onClick={()=> deletePost(posts._id)}>Delete</button>
                <button onClick={()=> openEdit(posts._id)}>Edit</button>
            </div>
        )
    })

    return (
        <div>
            <NewPost />
            <h1>Your Feed</h1>
            <div className="user-info">
                <img src="" alt="" className="profile-pic"/>
                <p>timestamp</p>
            </div>
            <p>{allPosts}</p>
        </div>
    )
}

export default UserFeed
