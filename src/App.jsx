import GoogleMap from "./components/Map/Map"
import {APILoader, PlaceOverview} from '@googlemaps/extended-component-library/react';
import React from 'react';
import './App.css';


function App() {

  return (
    <>
      <h1>Hello, world</h1>
      <GoogleMap/>
      <div className="container">
        {/* <APILoader 
          apiKey="YOUR_API_KEY_HERE"
          solutionChannel="GMP_GCC_placeoverview_v1_xl" 
        /> */}
        <PlaceOverview place="ChIJs5pMcluh_DoRUg03WydxF6s" />
      </div>
    </>
  )
}

export default App
