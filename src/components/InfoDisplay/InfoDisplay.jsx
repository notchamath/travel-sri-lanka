import { memo, useEffect, useRef } from 'react';
import { APILoader, PlaceOverview } from '@googlemaps/extended-component-library/react';

import './InfoDisplay.styles.scss';

const InfoDisplay = memo(({id, open, setOpen}) => {

  const infoDisplayRef = useRef();

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
        <PlaceOverview place={id}/>
      </div>
    </section>
  )
});

export default InfoDisplay;