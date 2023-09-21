import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'
import FilmList from './components/FilmList';
import FilmComplex from './components/FilmComplex'
import ActorList from './components/ActorList'



function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="" element={<HomePage/>} />

        <Route path="/films" element={<FilmList />} />
        <Route path='/actors' element={<ActorList />} />
        
        <Route path="/films/:film_id" element={<FilmComplex />} />
      </Routes>
    </div>
  );
}

export default App;