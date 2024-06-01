import { memo, useEffect, useRef } from 'react';
import { APILoader, PlaceOverview } from '@googlemaps/extended-component-library/react';

import './InfoDisplay.styles.scss';

const InfoDisplay = memo(({openLocation, open, setOpen}) => {

  const infoDisplayRef = useRef();
  const {id, category, desc, emoji} = openLocation;

  useEffect(() => {
    const handleClickOutside = (e) => {
      
      if (infoDisplayRef.current && !infoDisplayRef.current.contains(e.target)) {
        setOpen(false);
      } 
      if (infoDisplayRef.current && infoDisplayRef.current.contains(e.target)) {
        setOpen(true);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside, { passive: true });
    document.addEventListener('touchstart', handleClickOutside, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
    
  }, []);

  return (
    open && <section id='info-dispaly_container' ref={infoDisplayRef}> 
      <div id="info-dispaly_info">
        {/* <APILoader apiKey="YOUR_API_KEY_HERE" solutionChannel="GMP_GCC_placeoverview_v1_xl" /> */}
        <div id='info-dispaly_title'>
          <h3>{emoji} {category}</h3>
          <p>{desc}</p>
        </div>
          
        <PlaceOverview place={id}>
        </PlaceOverview>
      </div>
    </section>
  )
});

export default InfoDisplay;