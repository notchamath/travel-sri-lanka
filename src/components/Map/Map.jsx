import { useState, useEffect } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow
} from "@vis.gl/react-google-maps";
import { APILoader, PlaceOverview } from '@googlemaps/extended-component-library/react';

import { getAllLocationsFromDb } from '../../utils/firebase/firebase.utils';

import './Map.styles.css';

function GoogleMap() {
    
    const[open, setOpen] = useState(false);
    const[locationsList, setLocationsList] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const locations = await getAllLocationsFromDb();
            setLocationsList(locations);
        }
        fetchLocations();
    }, []);

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
                    {locationsList.map(location => {
                        const coords = {
                            lat: location.location.latitude,
                            lng: location.location.longitude,
                        };

                        return <>
                            <AdvancedMarker position={coords} onClick={() => setOpen(true)}>
                                <Pin
                                    background={"red"}
                                    borderColor={"orange"}
                                    glyphColor={"yellow"}
                                />
                            </AdvancedMarker>
                            {open && 
                                <InfoWindow position={coords} onCloseClick={() => setOpen(false)}>
                                    <div className="container">
                                        <APILoader apiKey="YOUR_API_KEY_HERE" solutionChannel="GMP_GCC_placeoverview_v1_xl" />
                                        <PlaceOverview place={location.id}/>
                                    </div>
                                </InfoWindow>
                            }
                        </>
                    })}

                </Map>
            </div>
        </APIProvider>
    )
}

export default GoogleMap;