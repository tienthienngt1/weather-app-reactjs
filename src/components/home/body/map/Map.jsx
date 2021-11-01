import React from 'react';
import GoogleMap from './GoogleMap';
import { GOOGLE_MAP_API } from '../../../../constants';

const Map = props => {
    return (
        <>
            <GoogleMap {...props}
					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API}&callback=initMap`}
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={
						<div
							style={{
								height: `100%`,
                                animation: `fromRight 1s ease-in-out`,
							}}
						/>
					}
					mapElement={<div style={{ height: `100%` }} />} />
        </>
    );
};

export default Map;