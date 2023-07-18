
// import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import FavList from './components/FavList';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/FavList' element={<FavList />} />
      </Routes>
    </div>
  );
}

export default App;
