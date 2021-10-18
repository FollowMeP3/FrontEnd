import { Link } from 'react-router-dom'
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../App'
import Errors from "./Errors";
import {API} from '../../App'



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
        // console.log(formState)
        // console.log(userData)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const newUser = {
                username: formState.username,
                password: formState.password
            }
            
            const loginResponse = await axios.post(`${API}/login`, newUser)
            
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            })
            localStorage.setItem("auth-token", loginResponse.data.token)

            setFormState({
                username: "",
                password: "",
            })

            window.location='/posts/days'
        } catch (err) {
            console.log(err)
            // err.response.data.msg
            //   ? setErrorMsg(err.response.data.msg)
            //   : setErrorMsg("Password Or Username Incorrect");
        }
    }

    return (
        <div className="login-regis-container">
            <div className="login-regis-headers">
            <h3>Login</h3>
            <p> If you do not have an account:
            <Link to={'/register'}> Register Here</Link>
            </p>
            <Errors msg={errorMsg}/>
            </div>
            <form className="col s12 form login-regis-form">
            <div className="row">
                <div className="input-field col s12">
                <label htmlFor="username">Username</label>
                    <input type="text" id="username" onChange={handleChange} value={formState.username}/>
                </div>   
                <div className="input-field col s12">
                <label htmlFor="password">Password</label>
                    <input type="text" id="password" onChange={handleChange} value={formState.password}/>
                </div>
                <button className="btn waves-effect waves-light login-regis-btn" onClick={handleSubmit} type="submit">Login</button>           
            </div>
            </form>
        </div>
    )
}

export default Login
