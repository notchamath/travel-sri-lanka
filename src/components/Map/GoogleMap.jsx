import { useState, useEffect } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin
} from "@vis.gl/react-google-maps";

import InfoDisplay from '../InfoDisplay/InfoDisplay';
import { getAllLocationsFromDb, CATEGORIES } from '../../utils/firebase/firebase.utils';

import './GoogleMap.styles.scss';

function GoogleMap() {
    
    const[open, setOpen] = useState(false);
    const[openLocation, setOpenLocation] = useState({});
    const[locationsList, setLocationsList] = useState({});

    useEffect(() => {
        const fetchLocations = async () => {
            const locations = await getAllLocationsFromDb();
            setLocationsList(locations);
        }
        fetchLocations();        
    }, []);

    const handlePinClick = (id, category, desc, emoji) => {
        setOpen(true);
        setOpenLocation({id, category, desc, emoji});
    }

    const defaultCenter = {lat: 7.8731, lng: 80.7718};
    const defaultZoom = 7.5;
    const boundRestrictions = {
        north: 9.99,   // Northernmost latitude
        south: 5.4,   // Southernmost latitude
        east: 82.4,   // Easternmost longitude
        west: 79.3,    // Westernmost longitude
    };

    const getEmoji = (category) => {

        switch(category){
            case CATEGORIES[0]:
                // Tourist Attraction
                return '📷';
           case CATEGORIES[1]:
                // Beach
                return '🏝️';
           case CATEGORIES[2]:
                // National Park
                return '🐘';
           case CATEGORIES[3]:
                // Temple
                return '🙏';
           case CATEGORIES[4]:
                // Hotel
                return '🏨';
           case CATEGORIES[5]:
                // Restaurant
                return '🍽️';
           default:
                <Pin/>
        }
    }

    const displayLocations = () => {

        return CATEGORIES.map(category => {

            return locationsList[category]?.map(location => {
                const coords = {
                    lat: location.location.latitude,
                    lng: location.location.longitude,
                };
                
                const id = location.id;
                const desc = location?.editorialSummary?.text;
                const emoji = getEmoji(category);
                
                return <div key={id}>
                    <AdvancedMarker  className={'marker_emoji'} position={coords} onClick={() => handlePinClick(id, category, desc, emoji)}>
                        <span>{emoji}</span>
                    </AdvancedMarker>
                </div>
            });
        });
    }

    return (
        <>
            <InfoDisplay openLocation={openLocation} open={open} setOpen={setOpen}/>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}>
                <div id='map'>
                    <Map 
                        defaultZoom={defaultZoom}
                        defaultCenter={defaultCenter}
                        restriction={{latLngBounds: boundRestrictions}}
                        mapId={import.meta.env.VITE_MAP_ID}
                    >
                        {
                            displayLocations()
                        }

                    </Map>
                </div>
            </APIProvider>
        </>
    )
}

export default GoogleMap;