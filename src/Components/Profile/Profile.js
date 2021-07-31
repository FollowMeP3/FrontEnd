import React from 'react'
import {Link} from 'react-router-dom'
import  './Profile.css'
import {useEffect} from 'react'

const Profile = () => {

    return (
        <div className='new'>
            <header>
            <h1>new profile</h1>
            </header>
    <form>

            <div className="container2">

                <div className='label'>
            <label >username:</label>
            <input className='box2' type="text"/>
            </div>

            <div className='label'>
            <label >password:</label>
            <input className='box2' type="text"/>
            </div>
            <div className='label'>
            <label >re-enter:</label>
            <input className='box2' type="text"/>
            </div>

                <div className='label'>
            <label >job title:</label>
            <input className='box2' type="text"/>
            </div>

            <div className='label'>
            <label >category:</label>
            <input className='box2' type="text"/>
            </div>


                <div className='label'>
            <label >company:</label>
            <input className='box2' type="text"/>
            </div>

            <div className='label'>
            <label >interest:</label>
            <input className='box2' type="text" placeholder='Javascript, Gaming, CyberSecurity etc..'/>
            </div>

 
            <div className='button'>
                <Link to={'/welcome'}>
        <button className='btn1'>FINISH</button>
                </Link>

        <Link to={'/'}>
        <button className='btn2'>CANCEL</button>
        </Link>
        </div>

           
            </div>
    </form>
        </div>
    )
}

export default Profile
