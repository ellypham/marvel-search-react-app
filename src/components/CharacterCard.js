import React from 'react'

const CharacterCard = ({character, handleCharacterClick}) => {
  return (
    <>
      <li className="featured-characters__card" data-charname={character.name} onClick={() => handleCharacterClick(character.name)}>
        <div className="card-img">
          <figure>
            <img src={character.imgUrl} alt={character.name}/>
          </figure>

        </div>
        <div className='card-body'>
          <p>{character.name}</p>
        </div>
      </li>
    </>
  )
}

export default CharacterCard