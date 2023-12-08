import React from 'react'
import CharacterCard from './CharacterCard'

const CharacterList = ({featuredCharacters, handleCharacterClick}) => {
  return(
    <div>
      <section className="featured-characters">
        <div className="container">
        <h2>Featured Characters</h2>
        <ul className="featured-characters__list">
            {featuredCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} handleCharacterClick={handleCharacterClick}/>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default CharacterList