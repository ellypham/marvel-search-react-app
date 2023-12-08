import React from 'react'
import Comic from './Comic'

const ComicList = ({comicsData}) => {
  return (
    <section className="comics">
      <div className="container">
        <ul className="comics__results">
          {comicsData.map((comic) => (
            <Comic comic={comic}/>
          ))}
        </ul>

        <div className="comics__pages">

        </div>

      </div>
    </section>
  )
}

export default ComicList