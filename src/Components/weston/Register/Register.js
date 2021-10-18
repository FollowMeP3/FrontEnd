import React, { useState, useContext } from 'react'
import { UserContext } from '../../../App'
import './Register.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Errors from '../Errors'
import {API} from '../../../App'

const Register =  () => {
    const { userData, setUserData } = useContext(UserContext)

    const initialState = { 
        name: '',
        username: '',
        password: '',
        email: '',
        company: '',
        occupation: '',
        position: '',
        software: '',
        hardware: '',
    };
    const [ formState, setFormState] = useState(initialState)

    const [errorMsg, setErrorMsg] = useState()


    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.id]: e.target.value })
        console.log(formState)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // console.log(formState)
            // setFormState(initialState)
            const newUser = {
                name: formState.name,
                username: formState.username,
                password: formState.password,
                email: formState.email,
                company: formState.company,
                occupation: formState.occupation,
                position: formState.position,
                software: formState.software,
                hardware: formState.hardware,
            }
            await axios.post(`${API}/register/`, newUser)
            .then(res => console.log(res.data))
            .then(console.log(newUser.name + " has been added"))
     
            const loginResponse = await axios.post(`${API}/login`, newUser)
            console.log(loginResponse.data)
        
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
        } catch(err) {
            console.log(err)
            // err.response.data.msg ?
            //     setErrorMsg(err.response.data.msg) : 
            //     setErrorMsg("we have eror")
        }
    }


    return (
        <div className="login-regis-container">
            <div className="login-regis-headers">
            <h3>Register</h3>
            <p>
                If you already have an account: <Link to={'/login'}>Login Here</Link>
            </p>
            </div>
            <Errors msg={errorMsg}/>
            <form className="col s12 login-regis-form">
            <div className="row">
                <div className="input-field col s12">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" onChange={handleChange} value={formState.name}/>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" onChange={handleChange} value={formState.username}/>   
                </div>
                <div className="input-field col s12">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" onChange={handleChange} value={formState.email}/>              
                </div>
                <div className="input-field col s12">
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" onChange={handleChange} value={formState.password}/>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="company">Company</label>
                    <input type="text" id="company" onChange={handleChange} value={formState.company}/>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="occupation">Occupation</label>
                    <input type="text" id="occupation" onChange={handleChange} value={formState.occupation}/>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="position">Position</label>
                    <input type="text" id="position" onChange={handleChange} value={formState.position}/>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="software">Software</label>
                    <input type="text" id="software" onChange={handleChange} value={formState.software}/>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="hardware">Hardware</label>
                    <input type="text" id="hardware" onChange={handleChange} value={formState.hardware}/>
                </div>
                <button className="btn waves-effect waves-light login-regis-btn" onClick={handleSubmit}type="submit">Register</button>  
            </div>         
            </form>
        </div>
    )

}

export default Register
