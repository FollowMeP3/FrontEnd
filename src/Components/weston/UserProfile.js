import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../App'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {API} from '../../App'

const UserProfile = (props) => {
    const { userData, setUserData } = useContext(UserContext)

    const [posts, setPosts ] = useState([])

    useEffect(() => {
        axios.get(`${API}/posts/days`, {
            headers: {"auth-token": localStorage.getItem("auth-token")}
        })
        .then(res => setPosts(res.data))
    }, [])

    console.log(userData.user)

    function deletePost(_id) {
        axios.delete(`${API}/posts/${_id}`)
        .then((post)=> {
            console.log(post)
            setPosts(posts.filter(post => post._id !== _id))
        })
        console.log(`deleted post with id of ${_id}`)
    }

    return (
        <div className="userprof-container">
            <UserContext.Provider value={{ userData, setUserData }}>  
            {userData.user ? (
            <div>
            <h4>{userData.user.name}</h4>
            <div className="profile-container">
                <p className="profile-headers">Username:  
                    <span className="profile-details" id="username-text-only"> {userData.user.username}</span></p>
                <p className="profile-headers">Email:  
                    <span className="profile-details"> {userData.user.email}</span></p>
                <p className="profile-headers">Company:  
                    <span className="profile-details"> {userData.user.company}</span></p>
                <p className="profile-headers">Occupation:  
                    <span className="profile-details"> {userData.user.occupation}</span></p>
                <p className="profile-headers">Position:  
                    <span className="profile-details"> {userData.user.position}</span></p>
                <p className="profile-headers">Hardware:  
                    <span className="profile-details"> {userData.user.hardware}</span></p>
                <p className="profile-headers">Software:  
                    <span className="profile-details"> {userData.user.software}</span></p>
            </div>
            <div>
            {/* <h4>{props.match.params.user}'s Posts</h4>  */}
            {posts.map((post) => {
                // console.log(post)
                if(props.match.params.user === post.postedBy) {
                    return (
                        <div className="post-container">
                        <div className="top-post">
                        <div className="name-time">
                        <Link to={`/userprofile/${post.postedBy}`} name={post.postedBy} className="username">{post.postedBy}</Link>
                        <div className='timeUserProf'>
                            <span className="timestamp">{new Date(post.date).getHours()}:{new Date(post.date).getMinutes()}</span>
                            <p className="timestamp">{new Date(post.date).toDateString()}</p>
                        </div>    
                        </div>
                        <div className="edit-delete-container">
                            <button onClick={() => deletePost(post._id)} className="waves-effect btn-flat" id="delete-btn">Delete</button>
                            <Link to={"/posts/edit/"+post._id} className=" waves-effect btn-flat" id="edit-btn">Edit</Link>
                        </div>
                        </div>
                        <p className="instance-text">{post.instance}</p>
                        </div>
                    )
                } 
            })}
            </div>
            </div>
            ) : (
                <div>
                <p>Please Log In: <Link to="/login">Login</Link></p>
                </div>
            )}
            </UserContext.Provider> 
        </div>
    )
}

export default UserProfile
