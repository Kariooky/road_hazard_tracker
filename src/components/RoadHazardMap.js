import React from 'react';
import { Map } from 'lucide-react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

function RoadHazardMap() {
  // Define the map's size
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  // Set your map's starting position (example: New York City)
  const defaultCenter = {
    lat: 0.1957,
    lng: 36.4148
  };

  return (
    <div className="p-4">
      {/* Header remains the same */}
      <h1 className="text-2xl font-bold">
        <Map className="inline mr-2" />
        Road Hazard Map
      </h1>

      {/* Replace the placeholder div with actual Google Maps */}
      <div className="mt-4">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
          >
            {/* Map markers will go here later */}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default RoadHazardMap;