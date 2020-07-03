import React, { useEffect, useState, Fragment } from 'react'
import Characters from './components/Characters'
import Pagination from './components/Pagination'
import axios from 'axios'
import './App.css'

export default function App() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [charactersPerPage] = useState(100)
  const [totalCharacters, setTotalCharacters] = useState(1500)

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true)
      console.log('process.env:', process.env.REACT_APP_API_KEY)
      const res = await axios.get(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=0e28f56f22ea92850f2a9d1bc7b638bb&limit=${charactersPerPage}&offset=${(currentPage - 1) * charactersPerPage}`)
      setCharacters(res.data.data.results)
      setTotalCharacters(parseInt(res.data.data.total))
      setLoading(false)
    }

    fetchCharacters()
  }, [currentPage])

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <Fragment>
      <h1 className='my-5 text-warning text-weight-bold text-center'>Marvel Characters</h1>
      <Pagination charactersPerPage={charactersPerPage} totalCharacters={totalCharacters} paginate={paginate} />
      <Characters characters={characters} loading={loading} />
    </Fragment>
  )
}
