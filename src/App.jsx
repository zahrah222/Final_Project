import { useState } from 'react';
import WorldMap from './WorldMap';
import BookSearch from './BookSearch.jsx';
import BookItemComponent from './BookItemCompenent.jsx';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null); // Fixed: was selectedBook

  function addBook(title, author, cover, country) {
    if (!country) {
      alert('Please select a country for the book.');
      return;
    }
    const newBook = { id: books.length + 1, title, author, cover, country };
    setBooks([...books, newBook]);
  }

  const readCountries = books.map(book => book.country);

  return (
    <div id="app-wrapper">
      <header id="header"> {/* Fixed: id was outside the tag as plain text */}
        <h1>Book Explorer</h1>
        <span className="selected-label">
          {selectedCountry ? `Selected Country: ${selectedCountry}` : 'Click a country to select it'}
        </span>
      </header>

      <main id="main-content">
        <div id="map-area">
          <WorldMap
            readCountries={readCountries}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        </div>

        <aside id="side-panel">
          <BookSearch selectedCountry={selectedCountry} addBook={addBook} />
          <div id="book-list">
            {books.map((book) => (
              <BookItemComponent
                key={book.id}
                title={book.title}
                author={book.author}
                cover={book.cover}
                country={book.country}
              />
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
