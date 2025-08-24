// event handler for right-clicks on the map
import { useMapEvents } from "react-leaflet";

const MapEvents = ({ onRightClick }) => {
    useMapEvents({
        contextmenu: (e) => {
            e.originalEvent.preventDefault();
            const { lat, lng } = e.latlng;
            onRightClick(lat, lng);
        }
    });

    return null;
};

export default MapEvents;