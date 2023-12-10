import React from 'react'

const Header = ({
  searchCharData,
  value,
  onChange,
  onSearch,
  onSubmit,
  showReadList,
}) => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="logo">
            <img src="img/Marvel_Logo.png" alt="" />
          </div>
          <div className="header__copy">
            <h1>Comic Reads</h1>
            <button
              className="btn__read-list"
              aria-label="Comic reading list"
              onClick={() => {
                showReadList()
              }}
            >
              Show Comic List
            </button>
          </div>
          <form className="search" autoComplete="off" onSubmit={onSubmit}>
            <div className="search__input">
              <label htmlFor="search">Search for comics by character:</label>
              <div className="search__field_container">
                <input
                  id="search"
                  className="search__field"
                  value={value}
                  placeholder="Type character name"
                  type="search"
                  onChange={onChange}
                />
                <div id="autocomplete__list">
                  <div className="autocomplete__card" data-charname="">
                    {searchCharData.map((character) => (
                      <div key={character} onClick={() => onSearch(character)}>
                        {character}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </header>
    </>
  )
}

export default Header
