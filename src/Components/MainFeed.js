import React from 'react'
import { useState, useEffect } from 'react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios';
import M from 'materialize-css'
import SearchBar from './SearchBar';

const MainFeed = ({match}) => {
    const [profileFeed, setProfileFeed] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/`)
        .then(res => setProfileFeed(res.data))
        .catch(console.err)
      }, [])


      let feedOfProfiles = profileFeed.map(profile => {
        return (
            <div className="post-content">
                <p>{profile.username}</p>
                <p>{profile.name}</p>
                <p>{profile.company}</p>
                <p>{profile.occupation}</p>
            </div>
            )
        })

    return (
        <div>
            <SearchBar placeholder="Enter..." data={profileFeed}/>
            {/* <div><p>{feedOfProfiles}</p></div> */}
        </div>
    )
}

export default MainFeed
