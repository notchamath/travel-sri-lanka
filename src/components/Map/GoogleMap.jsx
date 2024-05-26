import { useState, useEffect } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin
} from "@vis.gl/react-google-maps";

import InfoDisplay from '../InfoDisplay/InfoDisplay';
import { getAllLocationsFromDb } from '../../utils/firebase/firebase.utils';

import './GoogleMap.styles.css';

function GoogleMap() {
    
    const[openId, setOpenId] = useState(null);
    const[locationsList, setLocationsList] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const locations = await getAllLocationsFromDb();
            setLocationsList(locations);
        }
        fetchLocations();
    }, []);

    const handlePinClick = (id) => {
        setOpenId(id);
    }

    const defaultCenter = {lat: 7.8731, lng: 80.7718};
    const defaultZoom = 8;
    const boundRestrictions = {
        north: 9.99,   // Northernmost latitude
        south: 5.4,   // Southernmost latitude
        east: 82.4,   // Easternmost longitude
        west: 79.3,    // Westernmost longitude
    };

    return (
        <>
            <InfoDisplay id={openId}/>
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

                            const id = location.id;

                            return <div key={id}>
                                <AdvancedMarker position={coords} onClick={() => handlePinClick(id)}>
                                    <Pin
                                        background={"#000000"}
                                        borderColor={"#FFFFFF"}
                                        glyphColor={"yellow"}
                                    />
                                </AdvancedMarker>
                            </div>
                        })}

                    </Map>
                </div>
            </APIProvider>
        </>
    )
}

export default GoogleMap;