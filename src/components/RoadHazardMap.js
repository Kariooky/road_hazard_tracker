import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Map, AlertTriangle, Radio, Bell, Camera, Trophy, Settings, AlertCircle, X } from 'lucide-react';

function RoadHazardMap() {
  // State management for all features
  const [activeFilters, setActiveFilters] = useState(['pothole', 'bump', 'uneven']);
  const [selectedHazard, setSelectedHazard] = useState(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Map configuration
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const defaultCenter = {
    lat: 40.7128,
    lng: -74.0060
  };

  // Hazard types configuration
  const hazardTypes = {
    pothole: { 
      icon: '🔴', 
      label: 'Pothole',
      component: AlertCircle,
      color: 'text-red-500'
    },
    bump: { 
      icon: '🟡', 
      label: 'Speed Bump',
      component: AlertTriangle,
      color: 'text-yellow-500'
    },
    uneven: { 
      icon: '🟠', 
      label: 'Uneven Surface',
      component: Radio,
      color: 'text-orange-500'
    }
  };

  // Sample hazard data (replace with API call in production)
  const [hazards, setHazards] = useState([
    {
      id: 1,
      type: 'pothole',
      severity: 'high',
      position: { lat: 40.7128, lng: -74.0060 },
      description: 'Large pothole on main road',
      reportCount: 5,
      reports: [
        { user: 'John D.', date: '2024-12-20', severity: 'high', photo: true }
      ]
    },
    // Add more sample hazards as needed
  ]);

  // Filter Component
  function FilterSection() {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <h2 className="font-bold mb-2">Filter Hazards</h2>
        <div className="space-y-2">
          {Object.entries(hazardTypes).map(([type, info]) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.includes(type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setActiveFilters([...activeFilters, type]);
                  } else {
                    setActiveFilters(activeFilters.filter(t => t !== type));
                  }
                }}
                className="rounded"
              />
              <info.component className={info.color} size={16} />
              <span>{info.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  // Report Form Component
  function ReportForm() {
    const [newHazard, setNewHazard] = useState({
      type: 'pothole',
      severity: 'medium',
      description: '',
      photo: null
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Add new hazard to the list
      const hazardToAdd = {
        id: Date.now(),
        position: userLocation || defaultCenter,
        reportCount: 1,
        reports: [{
          user: 'Current User',
          date: new Date().toISOString().split('T')[0],
          severity: newHazard.severity,
          photo: !!newHazard.photo
        }],
        ...newHazard
      };

      setHazards(prev => [...prev, hazardToAdd]);
      setShowReportForm(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl">Report Hazard</h2>
            <X 
              className="cursor-pointer" 
              onClick={() => setShowReportForm(false)}
            />
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Hazard Type</label>
              <select
                className="w-full p-2 border rounded"
                value={newHazard.type}
                onChange={e => setNewHazard({...newHazard, type: e.target.value})}
              >
                {Object.entries(hazardTypes).map(([type, info]) => (
                  <option key={type} value={type}>{info.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1">Severity</label>
              <select
                className="w-full p-2 border rounded"
                value={newHazard.severity}
                onChange={e => setNewHazard({...newHazard, severity: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Description</label>
              <textarea
                className="w-full p-2 border rounded"
                value={newHazard.description}
                onChange={e => setNewHazard({...newHazard, description: e.target.value})}
                rows="3"
              />
            </div>

            <div>
              <label className="block mb-1">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => setNewHazard({...newHazard, photo: e.target.files[0]})}
                className="w-full"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowReportForm(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Hazard Details Component
  function HazardDetails({ hazard }) {
    if (!hazard) return null;

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">{hazardTypes[hazard.type].label}</h3>
          <X 
            className="cursor-pointer" 
            onClick={() => setSelectedHazard(null)}
          />
        </div>
        <div className="space-y-2">
          <p><strong>Severity:</strong> {hazard.severity}</p>
          <p><strong>Reports:</strong> {hazard.reportCount}</p>
          <p><strong>Description:</strong> {hazard.description}</p>
          
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Recent Reports</h4>
            {hazard.reports.map((report, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded mb-2">
                <div className="flex justify-between text-sm">
                  <span>{report.user}</span>
                  <span>{report.date}</span>
                </div>
                {report.photo && (
                  <Camera className="w-4 h-4 mt-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Alert System Component
  function AlertSystem() {
    return (
      <div className="fixed bottom-4 right-4 max-w-sm">
        {alerts.map((alert, index) => (
          <div 
            key={index}
            className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-2 rounded shadow-sm"
          >
            <div className="flex">
              <AlertTriangle className="text-yellow-400" />
              <div className="ml-3">
                <p className="font-medium">{alert.title}</p>
                <p className="text-sm">{alert.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  // Check for nearby hazards periodically
  useEffect(() => {
    if (!userLocation) return;

    const checkNearbyHazards = () => {
      hazards.forEach(hazard => {
        const distance = calculateDistance(userLocation, hazard.position);
        if (distance < 0.1) { // Within 100 meters
          setAlerts(prev => [
            ...prev,
            {
              title: `${hazardTypes[hazard.type].label} Ahead`,
              message: `${distance.toFixed(2)}km ahead on your route`
            }
          ]);
        }
      });
    };

    const interval = setInterval(checkNearbyHazards, 10000);
    return () => clearInterval(interval);
  }, [userLocation, hazards]);

  // Helper function to calculate distance between two points
  function calculateDistance(point1, point2) {
    // Haversine formula implementation
    const R = 6371; // Earth's radius in km
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold flex items-center">
          <Map className="mr-2" />
          Road Hazard Map
        </h1>
        <button
          onClick={() => setShowReportForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Camera size={16} />
          Report Hazard
        </button>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-4 gap-4">
        {/* Sidebar */}
        <div className="col-span-1">
          <FilterSection />
        </div>

        {/* Map */}
        <div className="col-span-3">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={13}
              center={userLocation || defaultCenter}
            >
              {/* User location marker */}
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={{
                    url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                  }}
                />
              )}

              {/* Hazard markers */}
              {hazards
                .filter(hazard => activeFilters.includes(hazard.type))
                .map(hazard => (
                  <Marker
                    key={hazard.id}
                    position={hazard.position}
                    onClick={() => setSelectedHazard(hazard)}
                    icon={{
                      url: `https://maps.google.com/mapfiles/ms/icons/${
                        hazard.severity === 'high' ? 'red' :
                        hazard.severity === 'medium' ? 'yellow' :
                        'green'
                      }-dot.png`
                    }}
                  />
                ))}

              {/* Info window for selected hazard */}
              {selectedHazard && (
                <InfoWindow
                  position={selectedHazard.position}
                  onCloseClick={() => setSelectedHazard(null)}
                >
                  <HazardDetails hazard={selectedHazard} />
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      {/* Modals and overlays */}
      {showReportForm && <ReportForm />}
      <AlertSystem />
    </div>
  );
}

export default RoadHazardMap;