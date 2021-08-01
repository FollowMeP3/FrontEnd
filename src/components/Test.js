import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import './test.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Errors from './Errors'

const Test =  () => {
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
            await axios.post('http://localhost:5000/register/', newUser)
            .then(res => console.log(res.data))
            .then(console.log(newUser.name + " has been added"))
     
            const loginResponse = await axios.post('http://localhost:5000/login', newUser)
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

            window.location='/'
        } catch(err) {
            err.response.data.msg ?
                setErrorMsg(err.response.data.msg) : 
                setErrorMsg("we have eror")
        }
    }


    return (
        <div>
            <h1>
                register
            </h1>
            <Errors msg={errorMsg}/>
            <form className="form">
                <label htmlFor="name">Name</label>
                    <input type="text" id="name" onChange={handleChange} value={formState.name}/>
                <label htmlFor="username">Username</label>
                    <input type="text" id="username" onChange={handleChange} value={formState.username}/>   
                <label htmlFor="email">Email</label>
                    <input type="text" id="email" onChange={handleChange} value={formState.email}/>              
                <label htmlFor="company">company</label>
                    <input type="text" id="company" onChange={handleChange} value={formState.company}/>
                <label htmlFor="occupation">Occupation</label>
                    <input type="text" id="occupation" onChange={handleChange} value={formState.occupation}/>
                <label htmlFor="position">Position</label>
                    <input type="text" id="position" onChange={handleChange} value={formState.position}/>
                <label htmlFor="software">Software</label>
                    <input type="text" id="software" onChange={handleChange} value={formState.software}/>
                <label htmlFor="hardware">Hardware</label>
                    <input type="text" id="hardware" onChange={handleChange} value={formState.hardware}/>
                <label htmlFor="password">Password</label>
                    <input type="text" id="password" onChange={handleChange} value={formState.password}/>
                <button onClick={handleSubmit}type="submit">Submit</button>           
            </form>
        </div>
    )

}

export default Test
