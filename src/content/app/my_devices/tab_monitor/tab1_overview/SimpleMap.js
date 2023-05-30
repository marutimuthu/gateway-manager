import React from 'react';
import GoogleMapReact from 'google-map-react';
import { google_map_api_key } from 'src/api/app.js';
import { Box } from '@mui/system';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap() {
  const defaultProps = {
    // 19.168906375045335, 72.85321442599377
    center: {
      lat: 19.168906375045335,
      lng: 72.85321442599377
    },
    zoom: 15
  };

  return (
    // Important! Always set the container height explicitly
    <Box>
      {google_map_api_key !== '' ? (
        <div style={{ height: '20vh', width: '100%', cursor: 'none' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: google_map_api_key }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
          >
            <AnyReactComponent
              lat={defaultProps.center.lat}
              lng={defaultProps.center.lng}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      ) : (
        false
      )}
    </Box>
  );
}
