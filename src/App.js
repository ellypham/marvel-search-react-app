import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import characterDropdowndata from './data/characterSearch'
import featuredCharacterData from './data/featuredCharacters'
import './App.scss'
import Header from './components/Header'
import CharacterList from './components/CharactersList'
import SearchResult from './components/SearchResult'
import ComicList from './components/ComicsList'
import ReadList from './components/ReadList'
import Loader from './components/loader'

// Get the input value from the user
// Use the input value to search for the character from a dropdown list
// Fetch the character data from the Marvel API using the value from the search input
// Get the character id from the data fetched
// Fetch comic data from the Marvel API using the character id

const App = () => {
  const publickey = 'b225687f4bb5b86654a2184eb87aa18b'
  const [value, setValue] = useState('')
  const [characterData, setCharacterData] = useState('')
  const [comicsData, setComicsData] = useState([])
  const [characterId, setCharacterId] = useState('')
  const [readList, setReadList] = useState([])
  const [loading, setLoading] = useState(false)
  const [displayReadList, setDisplayReadList] = useState(false)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (searchCharacter) => {
    setValue(searchCharacter)
  }

  const searchCharData = (data) => {
    return data
      .filter((character) => {
        const searchTerm = value.toLowerCase()
        const characterName = character.toLowerCase()
        return (
          searchTerm &&
          characterName.startsWith(searchTerm) &&
          characterName !== searchTerm
        )
      })
      .slice(0, 10)
  }

  const handleCharacterClick = (characterName) => {
    handleSubmit(null, characterName)
    fetchComics(characterId)
  }

  const handleSubmit = useCallback(
    async (e, characterName = null) => {
      if (e) {
        e.preventDefault()
      }
      setLoading(true)
      setComicsData([])

      let apiUrl = ''

      if (characterName) {
        apiUrl = `https://gateway.marvel.com/v1/public/characters?name=${characterName}&apikey=${publickey}`
      } else {
        apiUrl = `https://gateway.marvel.com/v1/public/characters?name=${value}&apikey=${publickey}`
      }

      try {
        const response = await axios.get(apiUrl)
        setCharacterData(response.data.data.results)
        setCharacterId(response.data.data.results[0].id.toString())

        if (response.data.data.results.length > 0) {
          fetchComics(characterId)
        }
      } catch (error) {
        console.log('Error fetching data:', error)
      } finally {
        setLoading(false)
      }

      setValue('')
    },
    [value, publickey, characterId],
  )

  useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSubmit()
      }
    }

    document.addEventListener('keydown', keyDownHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [handleSubmit])

  const fetchComics = async (characterId) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?apikey=${publickey}`,
      )
      setComicsData(response.data.data.results)
      console.log('comics', response.data.data.results)
    } catch (error) {
      console.log('Error fetching comics data:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetSearch = () => {
    setCharacterData('')
    setComicsData([])
  }

  const generateId = () => {
    return Math.floor(Math.random() * 100)
  }

  const showReadList = () => {
    setDisplayReadList(!displayReadList)
  }

  const addComic = (comic, img) => {
    const comicBook = {
      id: generateId(),
      read: false,
      comic: comic,
      img: img,
    }
    let readListCopy = [...readList, comicBook]
    setReadList(readListCopy)
  }

  const deleteComic = (id) => {
    const readListCopy = readList.filter((item) => item.id !== id)
    setReadList(readListCopy)
  }

  const toggleComic = (id) => {
    const index = readList.findIndex((item) => item.id === id)
    const readListCopy = [...readList]

    if (index !== -1) {
      // eslint-disable-next-line no-unused-expressions
      readListCopy[index].read = !readListCopy[index].read
    }

    setReadList(readListCopy)
  }

  return (
    <>
      <Header
        onChange={onChange}
        onSearch={onSearch}
        onSubmit={handleSubmit}
        showReadList={showReadList}
        searchCharData={searchCharData(characterDropdowndata)}
        value={value}
      />
      {/* {loading && <Loader />} */}
      {characterData ? (
        <SearchResult characterData={characterData} resetSearch={resetSearch} />
      ) : (
        <CharacterList
          featuredCharacters={featuredCharacterData}
          handleCharacterClick={handleCharacterClick}
        />
      )}
      {comicsData && <ComicList comicsData={comicsData} addComic={addComic} />}
      <ReadList
        readList={readList}
        displayReadList={displayReadList}
        showReadList={showReadList}
        deleteComic={deleteComic}
        toggleComic={toggleComic}
      />
    </>
  )
}

export default App
