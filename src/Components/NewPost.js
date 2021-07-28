import React from 'react'
import { useState, useEffect } from 'react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios';

const NewPost = () => {
    const initialState = {instance:'',imageUpload: ''};
    const [postContent, setPostContent] = useState(initialState)
    // const [instance, setInstance] = useState('')
    // const [imageUpload, setImageUpload] = useState('')

    useEffect(()=>{
        getPosts();
        // addPost();
    }, [])

    const getPosts = () => {
       fetch('http://localhost:5000/posts/days')
        .then(res => res.json())
        .then(res => {
          console.log(res)
          setPostContent(res)
        //   setInstance(res)
        //   setImageUpload(res)
        })
        .catch(err => {
          console.error(err);
        });
    }

    function addPost(e) {
        e.preventDefault();
        const newPost = {
          instance: postContent.instance,
          imageUpload: postContent.imageUpload,
        };
        axios.post("http://localhost:5000/posts/newpost", newPost)
        .then(res => {
            console.log(res)
            setPostContent(res)
          })
        .catch(err => {
            console.error(err);
         });
        // console.log(newPost);
        // alert("item added");
    }

    const handleChange = (e) => {
        setPostContent({...postContent, [e.target.id]: e.target.value})
    }
    
    return (
        <div>
            <form >
                <label htmlFor="instance"/>
                <textarea id="instance" placeholder="Type something here..."cols="30" rows="10" onChange={handleChange}></textarea>
                <button>Add Picture</button>
                <button>Add Gif</button>
                <button onClick={addPost} type="submit">Post</button>
            </form>
        </div>
    )
}

export default NewPost
