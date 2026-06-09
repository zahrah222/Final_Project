import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home.jsx';
import Login from './login.jsx';
import Signup from './signup.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
