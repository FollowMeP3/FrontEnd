import React from 'react'
import { useState, useEffect } from 'react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios';
import M from 'materialize-css'

const EditPost = ({match}) => {
    const [updateData, setUpdateData] = useState([])

    useEffect(() => {
        getUpdateData()
    },[])

    const getUpdateData = () => {
       axios.get(`http://localhost:5000/posts/${match.params.id}`)
        // .then(res => res.json())
        .then(res => {
          console.log(res)
          console.log(match.params.id)
          setUpdateData(res)
        })
        .catch(err => {
          console.error(err);
        });
    }

    const updatePost = (e) => {
        e.preventDefault()
        const editedPostData = {
            instance: updateData.instance,
            imageUpload: updateData.imageUpload,
        };
        console.log(editedPostData, "test")
        axios.put(`http://localhost:5000/posts/${match.params.id}/edit`, editedPostData)
        .then(res => {
            console.log(res)
            console.log(match.params.id)
            setUpdateData(res)
          })
        .then(window.location="/posts/days")
    }

    const handleChange = (e) => {
        setUpdateData({...updateData, [e.target.id]: e.target.value})
    }

    return (
        <div>
            {updatePost ? 
            <form onSubmit={updatePost}>
                <label htmlFor="instance"/>
                <textarea id="instance" cols="30" rows="10" onChange={handleChange}>{updateData.instance}</textarea>
                <button>Gif</button>
                <a href="/posts/days">Cancel</a>
                <button type="submit">Update</button>
            </form> : null
            }
        </div>
    )
}

export default EditPost