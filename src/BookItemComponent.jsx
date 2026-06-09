function BookItemComponent({ title, author, cover, country }) {
    return (
        <div className="book-card">
            <img src={cover} alt={title} />
            <div className="book-card-info">
                <h3>{title}</h3>
      <p className="book-country">{country}</p>
                <p>{author}</p>
            </div>
        </div>
    );
}

export default BookItemComponent;