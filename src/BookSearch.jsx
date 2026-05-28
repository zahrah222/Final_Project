import { useState } from 'react'
import countriesData from './countries.geo.json'


function BookSearch({ selectedCountry, addBook }) {
    const [query, setQuery] = useState('');
    const [country, setCountry] = useState('')
    const [results, setResults] = useState([]);
    
    const countryNames = countriesData.features
        .map((feature) => feature.properties.name)
        .sort()

    function searchBooks() {
        if (!query) {
            alert('Please enter a book title.');
            return;
        }
        fetch(`https://openlibrary.org/search.json?title=${query}&country=${selectedCountry}`)
            .then(response => response.json())
            .then(data => setResults(data.docs.slice(0, 10)))
            .catch(error => console.error('Error fetching books:', error));
    }

    function handleAddBook(book) {
        if (!country) {
            alert('Please select a country for the book.');
            return;
        }
        addBook(
            book.title,
            book.author_name ? book.author_name[0] : 'Unknown Author', 
            `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`, 
            country
        )

    }

    return (
        <div id="book-search">
            <div className="search-bar">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for books by title..."
                />
                <button onClick={searchBooks}>Search</button>
            </div>
             <select
        className="country-select"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="">-- Choose a country --</option>
        {countryNames.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>

      <div id="search-results">
        {results.map((book) => (
          <div key={book.key} className="search-result-item">
            <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`} alt={`${book.title} cover`} />
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>{book.author_name ? book.author_name[0] : 'Unknown Author'}</p>
              <button type="button" className="add-book-btn" onClick={() => handleAddBook(book)}>
                ➕ Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookSearch
            