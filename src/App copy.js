import React, { useEffect, useState, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
import './App.css'

const CharacterPage = (props) => {
  console.log('props:', props)
  return (
    <Fragment>
      <img src={props.character.thumbnail.path + "." + props.character.thumbnail.extension} alt=""/>
    </Fragment>
  )
}

export default function App() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(20)

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true)
      const res = await axios.get("https://gateway.marvel.com/v1/public/characters?ts=1&apikey=5bfb5cdf3f2c71536e8716b5381a4344&hash=0e28f56f22ea92850f2a9d1bc7b638bb")
      setCharacters(res.data.data.results)
      setLoading(false)
    }

    fetchCharacters()
    console.log("ComponentDidMount")
  }, [])

  return (
    <Router>
      <Route
        exact path="/"
        component={() =>
          characters.map(character =>
            <p><Link to={character.id.toString()} key={character.id.toString()} character={character}>{character.name}</Link></p>
          )
        } />
      <Route
        exact path="/:id"
        render={props => <CharacterPage character={characters.filter(ch => ch.id == props.match.params.id)[0]} />}
        // component={CharacterPage}
      />
    </Router>
  )
}
