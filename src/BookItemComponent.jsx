function BookItemComponent({ title, author, cover, country }) {
    return (
        <div className="book-item">
            <img src={cover} alt={`${title} cover`} />
            <div className="book-details">
                <h3>{title}</h3>
                <p>{author}</p>
                <p><em>{country}</em></p>
            </div>
        </div>
    );
}

export default BookItemComponent;