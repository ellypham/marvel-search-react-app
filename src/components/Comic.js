import React from 'react'

const Comic = ({ comic, addComic }) => {
  const comicTitle = comic.title
  const comicImg = `${comic.thumbnail.path}.${comic.thumbnail.extension}`
  return (
    <li>
      <img src={comicImg} alt="" />
      <p>{comicTitle}</p>
      <button
        onClick={() => addComic(comicTitle, comicImg)}
        className="btn__list"
        aria-label="Add Comic to read list"
      >
        Add to list
      </button>
    </li>
  )
}

export default Comic
