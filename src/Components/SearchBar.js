import React from 'react'
import { useState } from 'react'

const SearchBar = ({placeholder, data}) => {
    const [filteredData, setFilteredData] = useState([])

    const handleFilter = (e) => {
        const searchTerm = e.target.value
        const filterArr = data.filter((value) => {
            return value.occupation.toLowerCase().includes(searchTerm.toLowerCase())
        })
        if (searchTerm === "") {
            setFilteredData([])
        } else {
            setFilteredData(filterArr);
        }
    }
    
    return (
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder={placeholder} onChange={handleFilter}/>
                <div className="searchIcon"></div>
            </div>
            {filteredData.length != 0 && (
            <div className="dataResult">
                {filteredData.map((value, key) => {
                    return(
                        <div target="_blank">
                            <p>{value.occupation}</p>
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
