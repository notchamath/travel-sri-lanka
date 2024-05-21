import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.jsx';
import Home from './routes/Home/Home.jsx';
import AdminPage from './routes/AdminPage/AdminPage.jsx';
import Auth from './routes/Auth/Auth.jsx';

import './App.css';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Navbar/>}>
        <Route index element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='admin-page' element={<AdminPage/>}/>
      </Route>
    </Routes>
  )
}

export default App;
