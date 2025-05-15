import { useEffect, useState } from "react";

export const useRouteInfo = (start, end) => {
  const [routeInfo, setRouteInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRouteInfo = async () => {
      if (!window.H || !start || !end) return;

      setLoading(true);
      setError(null);

      try {
        const platform = new window.H.service.Platform({
          apikey: "YOUR_HERE_API_KEY",
        });

        const router = platform.getRoutingService(null, 8); // version 8

        const routingParams = {
          routingMode: "fast",
          transportMode: "car",
          origin: `${start.lat},${start.lng}`,
          destination: `${end.lat},${end.lng}`,
          return: "summary",
        };

        router.calculateRoute(
          routingParams,
          (result) => {
            if (result.routes.length > 0) {
              const summary = result.routes[0].sections[0].summary;

              setRouteInfo({
                time: Math.round(summary.duration / 60), // in minutes
                distance: (summary.length / 1000).toFixed(2), // in km
              });
            } else {
              setError("No route found.");
            }

            setLoading(false);
          },
          (err) => {
            setError("Error fetching route.");
            setLoading(false);
            console.error(err);
          }
        );
      } catch (err) {
        setError("Unexpected error.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchRouteInfo();
  }, [start, end]);

  return { routeInfo, loading, error };
};

