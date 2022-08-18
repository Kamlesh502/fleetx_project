import React from 'react'

export default function Searchbar() {
  return (
    <div className='search__bar'>
      <input type={"text"} placeholder="Search Images here..."></input>
      <button style={{ cursor: "pointer" }}>Search</button>
    </div>
  )
}
