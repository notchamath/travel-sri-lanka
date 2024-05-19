import { useState } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow
} from "@vis.gl/react-google-maps";
import {APILoader, PlaceOverview} from '@googlemaps/extended-component-library/react';

import './Map.styles.css';

//testing ************************************
const raw_data = {latitude: 6.0304592, longitude: 80.2150207} 
const {latitude: lat, longitude: lng} = raw_data;

// ***************************************

function GoogleMap() {
    const[open, setOpen] = useState(false);

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
                    <AdvancedMarker position={{lat, lng}} onClick={() => setOpen(true)}>
                        <Pin
                            background={"red"}
                            borderColor={"orange"}
                            glyphColor={"yellow"}
                        />
                    </AdvancedMarker>

                    {open && 
                        <InfoWindow position={{lat, lng}} onCloseClick={() => setOpen(false)}>
                            <div className="container">
                                <APILoader apiKey="YOUR_API_KEY_HERE" solutionChannel="GMP_GCC_placeoverview_v1_xl" />
                                <PlaceOverview place="ChIJXQLueKNz4ToR_sMWrhaKb7k"/>
                            </div>
                        </InfoWindow>
                    }
                </Map>
            </div>
        </APIProvider>
    )
}

export default GoogleMap;