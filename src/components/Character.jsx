import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

function Character({ characterId }) {
  const [character, setCharacter] = useState(null);
  const [detailUrl, setDetailUrl] = useState('');
  const [comicsCnt, setComicsCnt] = useState(0);
  const [comicsLength, setComicsLength] = useState(0);
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchCharacter = (charId) => {
      axios.get(`https://gateway.marvel.com/v1/public/characters/${charId}?ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=0e28f56f22ea92850f2a9d1bc7b638bb`)
        .then(res => {
          const tempChar = res.data.data.results[0];
          setCharacter(tempChar);
          const tempDetail = tempChar.urls.find((url) => url.type === 'detail');
          tempDetail && setDetailUrl(tempDetail.url);
          if (tempChar.comics.returned > 0) {
            setComicsLength(tempChar.comics.returned);
          }
      });
    }
    fetchCharacter(characterId);
  }, []);

  const fetchNthComic = (n) => {
    if (!character || n >= comicsLength || n >= 10) return;
    const comicItem = character.comics.items[n]
    axios.get(`${comicItem.resourceURI}?ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=0e28f56f22ea92850f2a9d1bc7b638bb`)
      .then(res => {
        console.log('res:', res)
        let {...tempComic} = res.data.data.results[0];
        setComicsCnt(comicsCnt + 1);
        setComics([...comics, tempComic]);
    });
  }

  useEffect(() => {
    fetchNthComic(0);
  }, [comicsLength]);

  useEffect(() => {
    fetchNthComic(comicsCnt);
  }, [comics])

  return (
    <div className="container">
      {character &&
        <Fragment>
          <h1 className="text-center text-warning pt-5">{`${character.name}`}</h1>
          <div className="row pt-3">
            <div class="col-12 col-sm-3 px-0">
              <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} className="card-text p-5 p-sm-0" alt="marvel character" width="100%" />
            </div>
            <div class="col-12 col-sm-9 px-4">
              <p className="detail-desc">{character.description}</p>
              <p className="detail-desc"><strong>Details : </strong><a href={detailUrl} target="_blank">{detailUrl}</a></p>
            </div>
              <h3 className="mt-3"><strong>Comics : </strong></h3>
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                {comics.map(comic => (
                  <div className="col p-4">
                    <div className="card bg-dark h-100">
                      <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="comic image" className="card-img-top"/>
                      <h6 className="card-title font-weight-normal p-2" style={{minHeight: "68px", maxHeight: "68px", overflow: "hidden"}}>{comic.title}</h6>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </Fragment>
      }
    </div>
  );
}

export default Character;
