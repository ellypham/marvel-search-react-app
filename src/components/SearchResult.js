import React from 'react'

const SearchResult = ({ characterData, resetSearch }) => {
  // Check if characterData exists and has at least one item
  if (!characterData || characterData.length === 0) {
    // Return some default content or a message when characterData is empty or undefined
    return (
      <section className="search__result">
        <div className="container">
          <p>No character data available</p>
        </div>
      </section>
    )
  }

  // Access characterData[0] safely with optional chaining
  const character = characterData[0]

  return (
    <section className="search__result">
      <div className="container">
        <div className="character__info">
          <figure>
            <img
              src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
              alt=""
            />
          </figure>
          <div className="character__copy">
            <button
              className="btn__back-to-search"
              href="#"
              onClick={resetSearch}
            >
              Back to Search
            </button>
            <h2>{character?.name}</h2>
            <p>{character?.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchResult
