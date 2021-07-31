import React from 'react'
import { useState, useEffect } from 'react'
import { Route, Link } from 'react-router-dom'
import M from 'materialize-css'
import axios from 'axios';

const SearchResult = ({match}) => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        // console.log(persons.username);
        axios.get(`http://localhost:5000/${match.params.username}`)
        // .then(res => res.json())
        .then(res => setPersons(res.data))
        .catch(console.err)
      }, [])

    return (
        <div>
            {persons.map(person => (
            <div>
                  <p><em>name</em>: {person.name}</p>
                  <p><em>username</em>: {person.username}</p>
                  <p><em>company</em>: {person.company}</p>
                  <p><em>occupation</em>: {person.occupation}</p>
                  <p><em>position</em>: {person.position}</p>
            </div>
            ))}
        </div>
    )
}

export default SearchResult
