import React from 'react'
import ReadItem from './ReadItem'

const ReadList = ({
  readList,
  displayReadList,
  showReadList,
  deleteComic,
  toggleComic,
}) => {
  return (
    <section className="read">
      <div
        className="read__panel"
        style={{ display: displayReadList ? 'block' : 'none' }}
      >
        <button
          className="btn__close-read-panel"
          onClick={() => showReadList()}
        >
          x
        </button>
        <h2>Comic Reading List</h2>
        <ul className="read__list">
          {readList.map((item) => (
            <ReadItem
              comic={item}
              deleteComic={deleteComic}
              toggleComic={toggleComic}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ReadList
