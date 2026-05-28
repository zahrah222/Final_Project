import { useState } from 'react';

function BookSearch({ selectedCountry, addBook }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    
    function searchBooks() {
        if (!selectedCountry) {
            alert('Please select a country first.');
            return;
        }
        fetch(`https://openlibrary.org/search.json?title=${query}&country=${selectedCountry}`)
            .then(response => response.json())
            .then(data => setResults(data.docs.slice(0, 10)))
            .catch(error => console.error('Error fetching books:', error));
    }

    function handleAddBook(book) {
        addBook(book.title, book.author_name ? book.author_name[0] : 'Unknown Author', `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`, selectedCountry);
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
