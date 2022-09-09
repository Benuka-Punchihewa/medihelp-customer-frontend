import React, { useState } from 'react'
import { GoogleMap,Marker,useLoadScript } from '@react-google-maps/api'
import '../assets/styles/GoogelMap/mapGoogel.css'


const MapGoogle =() => {
      
    //define default coords
    const [coords, setCoords] = useState({ lat:parseFloat(6.927079) , lng: parseFloat(79.861244) });

    const [zoom, setZoom] = useState(8);

    const [pharmacy] = useState([
      {
        name:"Samarasingha Pharmacy",
          lat:7.0191189666705975,
          lng:79.93785645261912,
      },
      {
        name:"Gayan Pharmacy",
          lat:7.0191189666705975,
          lng:79.99982645261912,
      },
      {
        name:"New Central Pharmacy",
          lat:7.0191189666705975,
          lng:79.89942645261912,
      },
      {
        name:"Safeway Chemist Pharmacy",
          lat:6.8994467542874105,
          lng:79.95779412784424,
      },
      {
        name:"Osil Pharmacy",
          lat:6.8994467542874105,
          lng:79.91779412784424,
      },
    ]);

    //load gopgel map API
    const {isLoaded}=useLoadScript({
        googleMapsApiKey:"AIzaSyAXqrbE_WqGgouE09hnobUk3L-8h3OrmqY",
    })
    
    function handleZoomChanged() {
      setZoom(this.getZoom());
       //this refers to Google Map instance
      let newLocation = this.getCenter();
      setCoords({ lat: newLocation.lat(), lng: newLocation.lng() });
    }

    if (!isLoaded) return <div>Loading...</div>;
    
  return (
 
    <div>
        {/* check googel map is loaded or not */}
         {isLoaded&&(
        <GoogleMap
            center={coords}
            zoom={zoom}
            mapContainerClassName="map-container"
            margin={[50, 50, 50, 50]}
            options={{ zoomControl: true}}
            onZoomChanged={handleZoomChanged}
        >

        {pharmacy.map((item,index)=>(
        <div key={index} 
        >
        
        <Marker 
            label={item.name}
            position={{
              lng:item.lng,
              lat:item.lat
            }}
          />
          
        </div> 
        ))}

        </GoogleMap>
    )}  
    </div>
  )
}

export default MapGoogle