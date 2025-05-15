import { useEffect, useRef } from "react";

const HereRouteMap = ({ start, end }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Wait until HERE maps are loaded
    if (!window.H) return;

    // Initialize the platform with your API key
    const platform = new window.H.service.Platform({
      apikey: "YOUR_HERE_API_KEY",
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new window.H.Map(
      mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: start,
        zoom: 14,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    // Enable map interaction (zoom, drag, etc.)
    new window.H.mapevents.Behavior(
      new window.H.mapevents.MapEvents(map)
    );

    // UI Controls (Zoom, Settings, etc.)
    window.H.ui.UI.createDefault(map, defaultLayers);

    // Create routing service
    const router = platform.getRoutingService(null, 8); // 8 is API version

    // Define the route request
    const routingParameters = {
      routingMode: "fast",
      transportMode: "car",
      origin: `${start.lat},${start.lng}`,
      destination: `${end.lat},${end.lng}`,
      return: "polyline,summary",
    };

    router.calculateRoute(routingParameters, (result) => {
      if (result.routes.length) {
        const route = result.routes[0];
        const routeShape = route.sections[0].polyline;

        // Decode the polyline
        const linestring = window.H.geo.LineString.fromFlexiblePolyline(routeShape);

        // Create a polyline and add it to the map
        const routeLine = new window.H.map.Polyline(linestring, {
          style: { strokeColor: "blue", lineWidth: 5 },
        });

        // Create markers for start and end
        const startMarker = new window.H.map.Marker(start);
        const endMarker = new window.H.map.Marker(end);

        map.addObjects([routeLine, startMarker, endMarker]);

        // Zoom to fit the route
        map.getViewModel().setLookAtData({
          bounds: routeLine.getBoundingBox(),
        });
      }
    }, (error) => {
      console.error("Route calculation error:", error);
    });

    return () => map.dispose();
  }, [start, end]);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default HereRouteMap;
