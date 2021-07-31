import React from 'react'
import './Signin.css'
import { Link } from 'react-router-dom'

const Signin = () => {
    return (
        <div className='main'>
            <h1>Day in the life</h1>
        <div className='container'>
            
            <h1>Please Log in</h1>
            <div className="form-control">
                 {/* <label>Email</label> */}
                 <input type="text" placeholder="email"/>
            </div>
           
            <div className="form-control">
                {/* <label>Password</label> */}
                <input type="text" placeholder="password"/>
            </div>
            <button className="btn">
                <Link to={'/home'}><span className='span1'>Login</span></Link>
                </button>
            <p className="text">
                Don't Have Account?  <Link to={'/signup'}><span>Sign Up</span></Link>  
            </p>
        </div>
        </div>
    )
}

export default Signin
