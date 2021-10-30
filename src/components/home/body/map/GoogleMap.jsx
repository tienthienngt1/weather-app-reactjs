import {Marker, withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps"
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'
import {IoLocation} from "react-icons/io5"

const Map = props => {
    return (
        <>
            <GoogleMap defaultZoom={8} defaultCenter = {{lat: props.data.resCurrent.coord.lat, lng: props.data.resCurrent.coord.lon}}>
            <Marker
              icon={{
                url: {IoLocation},
                scaledSize: new window.google.maps.Size(20, 20),
              }}
              position={{ lat: props.data.resCurrent.coord.lat, lng: props.data.resCurrent.coord.lon }}
          >
              <InfoBox
                options = {{closeBoxURL: '',enableEventPropagation: true}}
            >
              <>
                <div style={{ backgroundColor: 'green', color: 'white', borderRadius:'1em', padding: '0.8em' }}>
                  {props.data.resCurrent.name}
                </div>
              </>
            </InfoBox> 
              </Marker>
            </GoogleMap>
        </>
    );
};


export default withScriptjs(withGoogleMap(Map));