import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {UserContext} from '../App'
import Errors from './weston/Errors'
import {API} from '../App'
import PostsFeed from './PostsFeed'

const NewPost = ({setPosts}) => {
    const {userData, setUserData} = useContext(UserContext)

    const initialState = {
        instance: "",
        imageUpload: ""
    }
    const [post, setPost] = useState(initialState)

    const [errorMsg, setErrorMsg] = useState()

    const handleChange = (e) => {
        setPost({ ...post, [e.target.id]: e.target.value })
        console.log(post)
    }

    const handleSubmit =  (e) => {
        e.preventDefault()
      
            console.log(post)
            // setPost(initialState)

            const newPost = {
                instance: post.instance,
                postedBy: userData.user.name
                // imageUpload: post.imageUpload,
            }
    
            axios.post(`${API}/posts/newpost/`, newPost, {
                headers: {"auth-token": localStorage.getItem("auth-token")}
            })
            .then(res => console.log(res.data))
            
            console.log(post.instance)
            
            setPost({
                instance: "",
                imageUpload: "",
            })
            setTimeout(function(){ window.location = "/posts/days" }, 50);
            
    }

    return (
        <div id="create-post-container" className="row">
            <Errors msg={errorMsg}/>
                <form className="col s12" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                        <label htmlFor="instance">Add Post</label>
                        <input type="text" id="instance" name="instance" onChange={handleChange} value={post.instance} required/>
                        <button className="btn waves-effect waves-light" id="post-btn" type="submit">Post</button>
                        </div>
                    </div>
                </form>
            {/* <PostsFeed/> */}
        </div>
        
        )
    }
    
    export default NewPost
    
    // setPostContent({
        //     instance: e.target.value
        // })
    // body:JSON.stringify({
        //     instance: postContent.instance,
        //     imageUpload: postContent.imageUpload
        // })
    //---Adding Image Attempt
    // const handleImage = (e) => {
        //     setPostContent({...postContent, imageUpload: e.target.files[0]});
        //     console.log(e)
        // }
        // const handleSubmit = (e) => {
            //     e.preventDefault();
            //     addNewPost()
            // }
    
    //---Adding Image Attempt
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
                                //----------------Photo upload attempt
                                // <form >
                                //     <label htmlFor="instance"/>
                                //     <textarea id="instance" name="instance" cols="30" rows="10" onChange={handleChange} value={postContent.instance}></textarea>
                                //     <input type="file" name="imageUpload" className="image" accept=".png, .jpg, .jpeg" onChange={handleImage}></input>
                                //     <button>Add Gif</button>
                                //     <button className="btn waves-effect waves-light" type="submit" onClick={addPost}>Post</button>
                                // </form>
                                //onSubmit={handleSubmit}
                                

// import React from 'react'
// import { useState, useEffect } from 'react'
// import { Route, Link } from 'react-router-dom'
// import M from 'materialize-css'
// import axios from 'axios';

// const NewPost = ({setPosts}) => {
//     const initialState = {instance:'', imageUpload:''};
//     const [postContent, setPostContent] = useState(initialState)

//     useEffect(()=>{
//         getPosts();
//     }, [])

//     const getPosts = () => {
//        fetch('http://localhost:5000/posts/days')
//         .then(res => res.json())
//         .then(res => {
//           console.log(res)
//           setPosts(res)
//         })
//         .catch(err => {
//           console.error(err);
//         });
//     }
    
//     function addPost(e) {
//         e.preventDefault();
//         const newPostData = {
//             instance: postContent.instance,
//             imageUpload: postContent.imageUpload
//         };
//         axios.post("http://localhost:5000/posts/newpost", newPostData)
//         .then(res => {
//             console.log(res)
//             setPosts(res.data)
//         })
//         .catch(err => {
//             console.error(err);
//         });
//         console.log(newPostData);
//     }
    
    
//     const handleChange = (e) => {
//         setPostContent({...postContent, [e.target.id]: e.target.value})
//     }
    
//     return (
//         <div id="create-post-container" className="row">
//                 <form className="col s12">
//                     <div className="row">
//                         <div className="input-field col s12">
//                         <label htmlFor="instance">Create</label>
//                         <textarea id="instance" placeholder="Type something here..." className="materialize-textarea" onChange={handleChange}></textarea>
//                         <button className="btn waves-effect waves-light" onClick={addPost} type="submit">Post</button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
        
//         )
//     }
    
//     export default NewPost
    
//     // setPostContent({
//         //     instance: e.target.value
//         // })
//     // body:JSON.stringify({
//         //     instance: postContent.instance,
//         //     imageUpload: postContent.imageUpload
//         // })
//     //---Adding Image Attempt
//     // const handleImage = (e) => {
//         //     setPostContent({...postContent, imageUpload: e.target.files[0]});
//         //     console.log(e)
//         // }
//         // const handleSubmit = (e) => {
//             //     e.preventDefault();
//             //     addNewPost()
//             // }
    
//     //---Adding Image Attempt
//     // const addNewPost = async (postContent) => {
//         //     try {
//             //         const url = 'http://localhost:5000/posts/newpost'
//             //         const newPostData = {
//                 //             instance: postContent.instance,
//                 //             // imageUpload: postContent.imageUpload,
//                 //         }
//                 //         const newPostResponse = await fetch(url, newPostData, {
//                     //             // credentials: 'include', 
//                     //             method: 'POST',
//                     //             headers: {
//                         //                 'Content-Type': 'multipart/form-data'
//                         //             },
//                         //             body:JSON.stringify({
//                             //                 // instance: postContent.instance,
//                             //                 imageUpload: postContent.imageUpload
//                             //             })
//                             //         }) 
//                             //         const newPostJson = await newPostResponse.json()
//                             //         console.log(newPostResponse.status)
//                             //         console.log(newPostJson)
//                             //         console.log(setPosts)
//                             //         // setPostContent(newPostJson.data)
//                             //         setPosts(newPostJson.data)
//                             //         getPosts()
//                             //     }
//                             //     catch(err) {
//                                 //         console.error(err)
//                                 //     }
//                                 // }
//                                 //----------------Photo upload attempt
//                                 // <form >
//                                 //     <label htmlFor="instance"/>
//                                 //     <textarea id="instance" name="instance" cols="30" rows="10" onChange={handleChange} value={postContent.instance}></textarea>
//                                 //     <input type="file" name="imageUpload" className="image" accept=".png, .jpg, .jpeg" onChange={handleImage}></input>
//                                 //     <button>Add Gif</button>
//                                 //     <button className="btn waves-effect waves-light" type="submit" onClick={addPost}>Post</button>
//                                 // </form>
//                                 //onSubmit={handleSubmit}
                                