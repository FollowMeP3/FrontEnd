import React from 'react'
import { useState } from 'react'
import { Route, Link } from 'react-router-dom'
import M from 'materialize-css'


const SearchBar = ({placeholder, data}) => {
    const [filteredData, setFilteredData] = useState([])

    const handleFilter = (e) => {
        const searchTerm = e.target.value
        const filterArr = data.filter((value) => {
            return (((value.occupation.toLowerCase().includes(searchTerm.toLowerCase()))) 
            || ((value.name.toLowerCase().includes(searchTerm.toLowerCase())))
            || ((value.position.toLowerCase().includes(searchTerm.toLowerCase())))
            || ((value.company.toLowerCase().includes(searchTerm.toLowerCase())))
            || ((value.username.toLowerCase().includes(searchTerm.toLowerCase())))
            )
        })
        if (searchTerm === "") {
            setFilteredData([])
        } else {
            setFilteredData(filterArr);
        }
    }
    
    return (
        <div className="search">
            <div className="input-field">
                <label className="label-icon" for="search">
                    {/* <i className="material-icons">search</i> */}
                </label>
                <input id="search-bar" type="search" placeholder={placeholder} onChange={handleFilter}/>
                <i className="material-icons">close</i>
            </div>
            {filteredData.length != 0 && (
            <div className="dataResult">
                {filteredData.map((value, key) => {
                    return(
                        <div target="_blank">
                            <Link to={"/"+value.username}>
                                <div>
                                <p>{value.username}</p>
                                <p>{value.name}</p>
                                <p>{value.company}</p>
                                <p>{value.occupation}</p>
                                </div>
                            </Link>
                        </div>
                    )
                })
                }
            </div>
            )}
            <div className="searchInputs"></div>
        </div>
    )
}

export default SearchBar
