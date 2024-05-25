import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { UserContext } from './contexts/user.context.jsx';

import Navbar from './components/Navbar/Navbar.jsx';
import Home from './routes/Home/Home.jsx';
import AdminPage from './routes/AdminPage/AdminPage.jsx';
import Auth from './routes/Auth/Auth.jsx';

import './App.css';

function App() {

  const {currentUser} = useContext(UserContext);

  return (
    <Routes>
      <Route path='/' element={<Navbar/>}>
        <Route index element={<Home/>}/>

        <Route path='auth' element={!currentUser?<Auth/>:<Navigate to='/admin-page'/>}/>
        <Route path='admin-page' element={currentUser?<AdminPage/>:<Navigate to='/auth'/>}/>
      </Route>
    </Routes>
  )
}

export default App;
