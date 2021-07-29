import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import NewPost from './NewPost';
import { Route, Link } from 'react-router-dom'
import EditPost from './EditPost';

const UserFeed = () => {
    const [posts, setPosts] = useState([])
    // const [id, setId] = useState(null)
    // const initialState = {instance:'',imageUpload: ''};
    // const [updatePost, setUpdatePost] = useState(initialState)

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
    
    function deletePost(_id) {
        axios.delete(`http://localhost:5000/posts/${_id}`)
        .then(()=> {
            fetchAllPosts();
        })
        console.log(`deleted post with id of ${_id}`)
    }

    const updatePost = () => {
        const editedPostData = {
            instance: posts.instance,
            imageUpload: posts.imageUpload,
        };
        axios.put(`http://localhost:5000/posts/edit/${posts._id}`, editedPostData)
        .then(res => {
            console.log(res)
            setPosts(res)
          })
        // .catch(err => {
        //     console.error(err);
        //  });
    }

    let allPosts = posts.map(post => {
        return (
            <div className="post-content">
                <p>{post.instance}</p>
                <img src={post.imageUpload} alt=""/>
                <button onClick={() => deletePost(post._id)}>Delete</button>
                <Link to={"/posts/edit/"+post._id}>Edit</Link>
            </div>
        )
    })

    return (
        <div>
            <NewPost setPosts={setPosts} />
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