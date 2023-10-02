import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'
import FilmList from './components/FilmList';
import FilmComplex from './components/FilmComplex'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="" element={<HomePage/>} />
        <Route path="/films" element={<FilmList />} />
      </Routes>
    </div>
  );
}

export default App;