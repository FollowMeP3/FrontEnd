import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {UserContext} from '../App'
import Errors from './Errors'



const CreatePost = () => {
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
      
            // console.log(post)
            // setPost(initialState)

            const newPost = {
                instance: post.instance,
                imageUpload: post.imageUpload,
                postedBy: userData.user.name
            }
    
            axios.post('http://localhost:5000/posts/newpost/', newPost, {
                headers: {"auth-token": userData.token}
            })
            .then((window.location = "/posts/days"))
            .then(res => console.log(res.data))
            
            console.log(post)

            setPost({
                instance: "",
                imageUpload: "",
            })
    }


    return (
        <div>
            <h2>Add Post</h2>
            <Errors msg={errorMsg}/>
            <form>
                <label htmlFor="instance">New Post</label>
                <input type="text" id="instance" name="instance" onChange={handleChange} value={post.instance} required/>
                <button onClick={handleSubmit} type="submit">Post</button>
            </form>
        </div>
    )
}

export default CreatePost
