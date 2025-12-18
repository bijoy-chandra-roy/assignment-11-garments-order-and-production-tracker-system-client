import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const FactoryMap = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch('/locations.json')
            .then(res => res.json())
            .then(data => setLocations(data))
            .catch(error => console.error('Error loading locations:', error));
    }, []);

    return (
        <div className="py-16 bg-base-200">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-base-content">Our Production Hubs</h2>
                    <p className="max-w-2xl mx-auto text-base-content/70">
                        Strategically located factories and shipping centers ensuring rapid production and global delivery.
                    </p>
                </div>

                <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-2xl border border-base-300 z-0 relative">
                    <MapContainer 
                        center={[23.8103, 90.4125]} 
                        zoom={8} 
                        scrollWheelZoom={false} 
                        className="h-full w-full"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {locations.map((loc) => (
                            <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                                <Popup>
                                    <div className="font-semibold text-primary">{loc.name}</div>
                                    <div className="text-xs text-gray-600">{loc.type}</div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default FactoryMap;