import React from 'react';
import {APILoader, PlaceOverview} from '@googlemaps/extended-component-library/react';
import GoogleMap from "./components/Map/Map";
import AdminPage from './components/AdminPage/AdminPage';

import './App.css';


function App() {

  return (
    <>
      <h1>Hello, world</h1>
      <GoogleMap/>
      <AdminPage/>
    </>
  )
}

export default App
