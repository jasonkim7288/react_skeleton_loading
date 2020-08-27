import React from 'react'

function Pagination({ charactersPerPage, totalCharacters, currentPage, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCharacters / charactersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center mb-5">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              href="#"
              className={`page-link d-inline-block ${currentPage === number ? 'bg-warning text-dark font-weight-bolder' : 'bg-dark text-white'}`}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination