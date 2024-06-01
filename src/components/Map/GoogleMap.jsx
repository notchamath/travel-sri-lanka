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
    const[openId, setOpenId] = useState(null);
    const[locationsList, setLocationsList] = useState({});

    useEffect(() => {
        const fetchLocations = async () => {
            const locations = await getAllLocationsFromDb();
            setLocationsList(locations);
        }
        fetchLocations();        
    }, []);

    const handlePinClick = (id) => {
        setOpen(true);
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

    const getEmoji = (category) => {

        switch(category){
            case CATEGORIES[0]:
                // TOURIST ATTRACTION
                return <span>📷</span>
            case CATEGORIES[1]:
                // Beach
                return <span>🏝️</span>
            case CATEGORIES[2]:
                // National Park
                return <span>🐘</span>
            case CATEGORIES[3]:
                // Temple
                return <span>🙏</span>
            case CATEGORIES[4]:
                // Hotel
                return <span>🏨</span>
            case CATEGORIES[5]:
                // Restaurant
                return <span>🍴</span>
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
                
                return <div key={id}>
                    <AdvancedMarker  className={'marker_emoji'} position={coords} onClick={() => handlePinClick(id)}>
                        {getEmoji(category)}
                    </AdvancedMarker>
                </div>
            });
        });
    }

    return (
        <>
            <InfoDisplay id={openId} open={open} setOpen={setOpen}/>
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