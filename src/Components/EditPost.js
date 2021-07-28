import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';


const EditPost = () => {
    const initialState = {instance:'',imageUpload: ''};
    const [updateData, setUpdateData] = useState(initialState)

    const updatePost = (_id) => {
        axios.put(`http://localhost:5000/posts/edit/${_id}`, {
            instance: updateData.instance,
            imageUpload: updateData.imageUpload
        })
    }

    const handleChange = (e) => {
        setUpdateData({...updateData, [e.target.id]: e.target.value})
    }
    // (e) => setUpdateData(e.target.value)

    return (
        <div>
            <form>
                <label htmlFor="post"/>
                <textarea id="post" cols="30" rows="10" onChange={handleChange}></textarea>
                <button>Picture</button>
                <button>Gif</button>
                <a href="/posts">Cancel</a>
                <button type="submit" onClick={() => updatePost(updateData._id)}>Update</button>
            </form>
        </div>
    )
}

export default EditPost
