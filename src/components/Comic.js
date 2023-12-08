import React from 'react'

const Comic = ({comic}) => {
  return (
    <li>
      <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt=""/>
      <p>{comic.title}</p>
      <button className="btn__list" aria-label="Add Comic to read list">Add to list</button>
    </li>
  )
}

export default Comic