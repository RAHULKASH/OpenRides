import { useEffect, useRef } from "react";

const HereMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const platform = new window.H.service.Platform({
      apikey: "YOUR_HERE_API_KEY",
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new window.H.Map(
      mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: 28.6139, lng: 77.2090 }, // Default to New Delhi
        zoom: 14,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    // Enable zoom and drag
    const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
    const ui = window.H.ui.UI.createDefault(map, defaultLayers);

    // Cleanup on unmount
    return () => map.dispose();
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default HereMap;
