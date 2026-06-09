import { useState, useEffect } from 'react';
import WorldMap from './WorldMap';
import BookSearch from './BookSearch.jsx';
import BookItemComponent from './BookItemComponent.jsx';
import Stats from './Statslist.jsx';
import { collection, getDocs, addDoc,query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db, auth } from './firebase';
import './App.css';
import './home.css'

function Home() {
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
  const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      navigate('/login');
    }
  });
  return () => unsubscribeAuth(); // ← cleanup lives here
}, [navigate]);

useEffect(() => {
  if (!user) return;

  const booksQuery = query(
    collection(db, 'books'),
    where('userId', '==', user.uid),
    orderBy('timestamp', 'desc')
  );

  const unsubscribeBooks = onSnapshot(booksQuery, (snapshot) => {
    const booksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setBooks(booksData);
  });

  return () => unsubscribeBooks(); // ← only books cleanup here
}, [user]);

async function addBook(title, author, cover, country) {
    if (!country) {
      alert('Please select a country for the book.');
      return;
    }
    const alreadySaved = books.some(        
      b => b.title.toLowerCase() === title.toLowerCase()
    );
    if (alreadySaved) {
      alert('This book is already in your list.');
      return;
    }

    if (user) {
      try {
        await addDoc(collection(db, 'books'), {
          userId: user.uid,
          title,
          author,
          cover,
          country,
          timestamp: new Date(),
        });
      } catch (e) {
        console.error('Error adding book: ', e);
      }
    }
  }

  function handleSignOut() {
    signOut(auth).then(() => navigate('/login'));
  }

  const readCountries = books.map(book => book.country);

  return (
    <div id="app-wrapper">
      <header id="header"> 
        <h1>Book Explorer</h1>
         <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
      </header>

      <main id="main-content">
        <div id="map-area">
          <WorldMap
            readCountries={readCountries}
          />
        </div>

        <aside id="side-panel">
            <Stats books={books} />
             <BookSearch addBook={addBook} />
            </aside>
        </main>
        </div>
    );
    }

    export default Home;
