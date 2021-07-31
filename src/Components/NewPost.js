import React from 'react'
import { useState, useEffect } from 'react'
import { Route, Link } from 'react-router-dom'
import M from 'materialize-css'
import axios from 'axios';

const NewPost = ({setPosts}) => {
    const initialState = {instance:'', imageUpload:''};
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

    // const addNewPost = async (postContent) => {
    //     try {
    //         const url = 'http://localhost:5000/posts/newpost'
    //         const newPostData = {
    //             instance: postContent.instance,
    //             // imageUpload: postContent.imageUpload,
    //         }
    //         const newPostResponse = await fetch(url, newPostData, {
    //             // credentials: 'include', 
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             },
    //             body:JSON.stringify({
    //                 // instance: postContent.instance,
    //                 imageUpload: postContent.imageUpload
    //             })
    //         }) 
    //         const newPostJson = await newPostResponse.json()
    //         console.log(newPostResponse.status)
    //         console.log(newPostJson)
    //         console.log(setPosts)
    //         // setPostContent(newPostJson.data)
    //         setPosts(newPostJson.data)
    //         getPosts()
    //     }
    //     catch(err) {
    //         console.error(err)
    //     }
    // }

    function addPost(e) {
        e.preventDefault();
        const newPostData = {
          instance: postContent.instance,
          imageUpload: postContent.imageUpload,
        };
        axios.post("http://localhost:5000/posts/newpost", newPostData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }, 
            // body:JSON.stringify({
            //     instance: postContent.instance,
            //     imageUpload: postContent.imageUpload
            // })
        })
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
        console.log(e)
    }
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     addNewPost()
    // }

    const handleChange = (e) => {
        setPostContent({...postContent, [e.target.id]: e.target.value})
        // setPostContent({
        //     instance: e.target.value
        // })
    }

    return (

            // <div id="create-post-container" className="row">
            //     <form className="col s12">
            //         <div className="row">
            //             <div className="input-field col s12">
            //             <label for="instance">Create</label>
            //             <textarea id="instance" placeholder="Type something here..." className="materialize-textarea" onChange={handleChange}></textarea>
            //             <button className="btn waves-effect waves-light" onClick={addPost} type="submit">Post</button>
            //             </div>
            //         </div>
            //     </form>
            // </div>
        
            <form >
                <label htmlFor="instance"/>
                <textarea id="instance" name="instance" cols="30" rows="10" onChange={handleChange} value={postContent.instance}></textarea>
                <input type="file" name="imageUpload" className="image" accept=".png, .jpg, .jpeg" onChange={handleImage}></input>
                <button>Add Gif</button>
                <button className="btn waves-effect waves-light" type="submit" onClick={addPost}>Post</button>
            </form>
    )
}

export default NewPost

//onSubmit={handleSubmit}
