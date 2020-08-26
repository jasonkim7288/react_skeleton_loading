import React, { useEffect, useState, Fragment } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Characters from './components/Characters'
import Pagination from './components/Pagination'
import Character from './components/Character'
import axios from 'axios'
import './App.css'

export default function App() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [charactersPerPage] = useState(100)
  const [totalCharacters, setTotalCharacters] = useState(1500)

  useEffect(() => {
    const fetchCharacters = () => {
      setLoading(true)
      axios.get(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=0e28f56f22ea92850f2a9d1bc7b638bb&limit=${charactersPerPage}&offset=${(currentPage - 1) * charactersPerPage}`)
        .then(res => {
          setCharacters(res.data.data.results)
          setTotalCharacters(parseInt(res.data.data.total))
          setLoading(false)
        })
    }
    fetchCharacters()
  }, [currentPage])

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <BrowserRouter>
      <Route
        exact path="/"
        component={ () =>
            <Fragment>
              <h1 className='my-5 text-warning text-weight-bold text-center'>Marvel Characters</h1>
              <Pagination charactersPerPage={charactersPerPage} totalCharacters={totalCharacters} currentPage={currentPage} paginate={paginate} />
              <Characters characters={characters} loading={loading} />
            </Fragment>
        }
      />
      <Route
        exact path="/:id"
        render={props => <Character characterId={props.match.params.id}/>}
      />
    </BrowserRouter>
  )
}
