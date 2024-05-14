import React from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow
} from "@vis.gl/react-google-maps";

import './Map.styles.css';

function GoogleMap() {

    const defaultCenter = {lat: 7.8731, lng: 80.7718};
    const defaultZoom = 8;
    const boundRestrictions = {
        north: 9.99,   // Northernmost latitude
        south: 5.4,   // Southernmost latitude
        east: 82.4,   // Easternmost longitude
        west: 79.3,    // Westernmost longitude
    };

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}>
            <div id='map'>
                <Map 
                    defaultZoom={defaultZoom}
                    defaultCenter={defaultCenter}
                    restriction={{latLngBounds: boundRestrictions}}
                    mapId={import.meta.env.VITE_MAP_ID}
                >
                </Map>
            </div>
        </APIProvider>
    )
}

export default GoogleMap;