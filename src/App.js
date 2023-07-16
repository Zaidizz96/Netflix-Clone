
// import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import FavList from './components/FavList';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/FavList' element={<FavList />} />
      </Routes>
    </div>
  );
}

export default App;
