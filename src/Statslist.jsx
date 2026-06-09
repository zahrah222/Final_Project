export default function Stats() {
    const totalBooks = books.length;
    const countryCounts = books.reduce((acc, book) => {
    acc[book.country] = (acc[book.country] || 0) + 1;
    return acc;
  }, {});

  const countriesExplored = Object.keys(countryCounts).length;

  const topCountry = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';

  if (totalBooks === 0) return null;

  return (
        <div id="stats">
      <div className="stat">
        <span className="stat-value">{totalBooks}</span>
        <span className="stat-label">Books read</span>
      </div>
      <div className="stat">
        <span className="stat-value">{countriesExplored}</span>
        <span className="stat-label">Countries explored</span>
      </div>
      <div className="stat">
        <span className="stat-value">{topCountry}</span>
        <span className="stat-label">Top country</span>
      </div>
    </div>
  );
}
