import { Link } from 'react-router-dom'
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../App'
import Errors from "./Errors";

const Login = () => { 

    const {userData, setUserData} = useContext(UserContext)

    const initialState = { 
        username: '',
        password: ''
    };
    const [ formState, setFormState] = useState(initialState)

    const [errorMsg, setErrorMsg] = useState();

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.id]: e.target.value })
        console.log(formState)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(formState)
        try {
            const newUser = {
                username: formState.username,
                password: formState.password
            }
            
            const loginResponse = await axios.post('http://localhost:5000/login', newUser)
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            })
            localStorage.setItem("auth-token", loginResponse.data.token)

            setFormState({
                username: "",
                password: "",
            })

            window.location='/'
        } catch (err) {
            err.response.data.msg
              ? setErrorMsg(err.response.data.msg)
              : setErrorMsg("We have an error!");
        }
    }

    return (
        <div>
            {/* <div>
                <Link to={'./register'}>register</Link>
                <br>
                </br>
                <Link to={'/'}>Users</Link>
            </div> */}
            <div>
            <h1>
                LOGIN
            </h1>
            <form className="form">
                <label htmlFor="username">Username</label>
                    <input type="text" id="username" onChange={handleChange} value={formState.username}/>   
                <label htmlFor="password">Password</label>
                    <input type="text" id="password" onChange={handleChange} value={formState.password}/>
                <button onClick={handleSubmit}type="submit">Submit</button>           
            </form>
        </div>
        </div>
    )
}

export default Login
