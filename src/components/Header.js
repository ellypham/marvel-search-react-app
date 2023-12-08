import React from 'react'

const Header = ({characters, value, onChange, onSearch, onSubmit}) => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="logo">
            <img src="img/Marvel_Logo.png" alt=""/>
          </div>
          <div className="header__copy">
            <h1>Comic Reads</h1>
            <button className="btn__read-list" aria-label="Comic reading list">Show Comic List</button>
          </div>
          <form className="search" autoComplete="off" onSubmit={onSubmit} >
            <div className="search__input">
                <label htmlFor="search">Search for comics by character:</label>
                  <div className="search__field_container">
                    <span className="search__icon">
                      <i className="fas fa-search" aria-hidden="true"></i>
                    </span>
                    <input id="search" className="search__field" value={value} placeholder="Type character name" type="search" onChange={onChange}/>
                    <button className="search__button" aria-label="Search for comics by character">Search</button> 
                    <div id='autocomplete__list'>
                      <div className="autocomplete__card" data-charname="">
                        {characters.map((character) => (<div key={character} onClick={()=>onSearch(character)}>{character}</div>))}
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