import React from 'react'
import { useState, useEffect } from 'react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios';

const NewPost = ({setPosts}) => {
    const initialState = {instance:''};
    const [postContent, setPostContent] = useState(initialState)

    useEffect(()=>{
        getPosts();
    }, [])

    const getPosts = () => {
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

    function addPost(e) {
        e.preventDefault();
        const newPostData = {
          instance: postContent.instance,
          imageUpload: postContent.imageUpload,
            //   const imageData = new FormData();
            //   imageData.append('imageUpload', postContent.imageUpload);
        };
        // const newPostData = new FormData();
        // newPostData.append('instance', postContent.instance);
        // newPostData.append('imageUpload', postContent.imageUpload);
        // console.log(newPostData)

        axios.post("http://localhost:5000/posts/newpost", newPostData, 
        // {headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }}
        )
        .then(res => {
            console.log(res)
            setPosts(res.data)
          })
        .catch(err => {
            console.error(err);
         });
        console.log(newPostData);
    }

    const handleImage = (e) => {
        setPostContent({...postContent, imageUpload: e.target.files[0]});
    }
    
    const handleChange = (e) => {
        setPostContent({...postContent, [e.target.id]: e.target.value})
    }
    return (
        <div>
            <form enctype="multipart/form-data">
                <label htmlFor="instance"/>
                <textarea id="instance" placeholder="Type something here..."cols="30" rows="10" onChange={handleChange}></textarea>
                <input type="file" name="imageUpload" accept=".png, .jpg, .jpeg" onChange={handleImage}></input>
                <button>Add Gif</button>
                <button onClick={addPost} type="submit">Post</button>
            </form>
        </div>
    )
}

export default NewPost
