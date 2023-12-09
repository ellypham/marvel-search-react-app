import React from 'react'

const ReadItem = ({ comic, deleteComic, toggleComic }) => {
  return (
    <>
      <li
        className={`read__item ${
          comic.read === false ? '' : 'read__item-strike'
        }`}
      >
        <label>
          {comic.comic}
          Title
          <input
            type="checkbox"
            id="read"
            className="read__checkbox"
            onClick={() => toggleComic(comic.id)}
          />
          <span className="read__checkmark"></span>
        </label>
        <img src={comic.img} alt="" />
        <button
          className="btn__delete"
          aria-label="Delete from comic read list"
          onClick={() => deleteComic(comic.id)}
        >
          x
        </button>
      </li>
    </>
  )
}

export default ReadItem
