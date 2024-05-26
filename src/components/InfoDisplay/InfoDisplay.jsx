import { APILoader, PlaceOverview } from '@googlemaps/extended-component-library/react';

import './InfoDisplay.styles.css';

function InfoDisplay({id}) {

  return (
    <section id='info-dispaly_container'> 
      <div id="info-dispaly_info">
        <APILoader apiKey="YOUR_API_KEY_HERE" solutionChannel="GMP_GCC_placeoverview_v1_xl" />
        <PlaceOverview place={id}/>
      </div>
    </section>
  )
}

export default InfoDisplay