import { useState } from 'react';

export default function Stats({ books }) {
  const [open, setOpen] = useState(false);

  const totalBooks = books.length;
  const totalCountries = new Set(books.map(b => b.country)).size;

  return (
    <div className="stats-wrapper">
      <button className="stats-toggle-btn" onClick={() => setOpen(!open)}>
        <span>📊 Stats</span>
        <span>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="stats-dropdown">
          <div className="stats-row">
            <div className="stat">
              <span className="stat-value">{totalBooks}</span>
              <span className="stat-label">Books</span>
            </div>
            <div className="stat">
              <span className="stat-value">{totalCountries}</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>

          <div className="stats-covers">
            {books.map(book => (
              <img
                key={book.id}
                src={book.cover}
                alt={book.title}
                title={book.title}
                className="stats-cover-img"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
