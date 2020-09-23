import React from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';

// Receive props from Hotel Component
const MapView = (props) => {
    const marker = props.marker;
    console.log(marker)
    return (
        <div style={{ height: '70vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "GOOGLE_MAP_API" }}
          defaultCenter={marker}
          defaultZoom={10}
        >
          <FontAwesomeIcon style={{color:'#40B6F7'}} icon={faMapMarker} size="2x" position={marker} />
        </GoogleMapReact>
      </div>
    );
};

export default MapView;
