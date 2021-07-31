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
        axios.put(`http://localhost:5000/posts/edit/${match.params.id}`, editedPostData)
        .then(res => {
            console.log(res)
            console.log(match.params.id)
            setUpdateData(res)
          })
    }

    const handleChange = (e) => {
        setUpdateData({...updateData, [e.target.id]: e.target.value})
    }

    return (
        <div>
            {updatePost ? 
            <form>
                <label htmlFor="instance"/>
                <textarea id="instance" cols="30" rows="10" onChange={handleChange}>{updateData.instance}</textarea>
                <button>Gif</button>
                <a href="/posts/days">Cancel</a>
                <Link to="/posts/days" onClick={updatePost}>Update</Link>
            </form>: null
            }
        </div>
    )
}

export default EditPost

// {/* <input type="file" name="imageUpload" accept=".png, .jpg, .jpeg"></input> */}
// {/* <img src={updateData.imageUpload} alt=""/> */}