import React from 'react'
import { Link } from 'react-router-dom'
import './Characters.scss'
import '../App.css'
import "placeholder-loading/src/scss/placeholder-loading.scss"

function Characters({ characters, loading }) {
  if (loading) {
    return (
      <div className="main-width mx-auto px-3">
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
          {Array.from(Array(20).keys()).map(i =>
            <div className="col mb-4">
            <div className="ph-item char-card-ph mb-4 mx-auto" key={i}>
              <div className="ph-col-12">
                <div className="ph-picture card-img-top"></div>
                <div className="ph-row">
                  <div className="ph-col-6 big"></div>
                  <div className="ph-col-4 empty big"></div>
                  <div className="ph-col-2 big"></div>
                  <div className="ph-col-4"></div>
                  <div className="ph-col-8 empty"></div>
                  <div className="ph-col-6"></div>
                  <div className="ph-col-6 empty"></div>
                  <div className="ph-col-12"></div>
                </div>
              </div>
            </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="main-width mx-auto px-3">
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
        {characters.map(character => (
          <div className="col mb-4">
            <div className="card bg-dark h-100 rounded-0 char-card mx-auto" >
              <Link to={character.id.toString()} key={character.id.toString()} character={character}>
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  className="card-img-top"
                  alt="marvel character"
                  style={{objectFit: character.thumbnail.path.includes('image_not_available') ? "contain" : "cover"}}
                />
                <div className="card-body p-2">
                  <h4
                    className="card-title font-weight-normal text-white"
                    style={{ minHeight: 60, maxHeight: 60, overflow: "hidden" }}
                  >{character.name}</h4>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Characters