import React, {useState, useEffect} from 'react'
import axios from 'axios'
import characterSearchdata from './data/characterSearch'
import featuredCharacterData from './data/featuredCharacters'
import './App.scss'
import Header from './components/Header'
import CharacterList from './components/CharactersList'
import SearchResult from './components/SearchResult'
import ComicList from './components/ComicsList'

  // Get the input value from the user
  // Use the input value to search for the character from a dropdown list
  // Fetch the data from the Marvel API using the value from the search input

const App = () => {
  const publickey = "b225687f4bb5b86654a2184eb87aa18b"  
  const [value, setValue] = useState('')
  const [characterData, setCharacterData] = useState('')
  const [comicsData, setComicsData] = useState('')
  const [characterId, setCharacterId] = useState('')
  console.log({characterData})
  const [selectedCharacter, setSelectedCharacter] =  useState({})
  const [loading, setLoading] = useState(true)

  const onChange = (event) => {
    // resetSearch()
    setValue(event.target.value)
  }
  
  const onSearch = (searchCharacter) => {
    setValue(searchCharacter)
  }

  const searchCharData = (data) => {
    return data.filter((character) => {
      const searchTerm = value.toLowerCase();
      const characterName = character.toLowerCase();
      return searchTerm && characterName.startsWith(searchTerm) && characterName !== searchTerm;
    }).slice(0,10)
  } 

  const handleCharacterClick = (characterName) => {
    setSelectedCharacter(characterName)
    
    handleSubmit(null, characterName);
    fetchComics(characterId)
  }

  const handleSubmit = async (e, characterName = null) => {
    if (e) {
      e.preventDefault()
    }
    setLoading(true)
    setComicsData([])

    let apiUrl = ''
    
    if (characterName) {
      apiUrl =`https://gateway.marvel.com/v1/public/characters?name=${characterName}&apikey=${publickey}`
    } else {
      apiUrl = `https://gateway.marvel.com/v1/public/characters?name=${value}&apikey=${publickey}`
    }

    try {
      const response = await axios.get(apiUrl)
      setCharacterData(response.data.data.results)
      setCharacterId(response.data.data.results[0].id.toString())

      if(response.data.data.results.length > 0) {
        fetchComics(characterId)
      }
    } catch (error) {
      console.log('Error fetching data:', error)
    } finally {
      setLoading(false)
    }

    setValue('')
  }

  const fetchComics = async (characterId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}/comics?apikey=${publickey}`);
      setComicsData(response.data.data.results);
      console.log('comics', response.data.data.results)
    } catch (error) {
      console.log('Error fetching comics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setCharacterData('')
    setComicsData('')
  }

  return (
    <>
      <Header onChange={onChange} onSearch={onSearch} onSubmit={handleSubmit} characters={searchCharData(characterSearchdata)} value={value}/>
      {characterData ? (<SearchResult characterData={characterData} resetSearch={resetSearch} />) : (<CharacterList featuredCharacters={featuredCharacterData} handleCharacterClick={handleCharacterClick} />) }
      {comicsData && <ComicList comicsData={comicsData} />}
    </>
  );
}

export default App
