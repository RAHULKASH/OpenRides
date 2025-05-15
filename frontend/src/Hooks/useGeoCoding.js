import { useEffect, useState } from "react";

// Utility for debounce
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Full Geocoding Hook
export const useGeoCoding = ({ address = null, coordinates = null }) => {
  const debouncedAddress = useDebounce(address, 500);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!window.H || (!debouncedAddress && !coordinates)) return;

    const platform = new window.H.service.Platform({
      apikey: "YOUR_HERE_API_KEY",
    });

    const geocoder = platform.getGeocodingService();

    const performGeocoding = async () => {
      setLoading(true);
      setError(null);

      try {
        if (debouncedAddress) {
          // Forward Geocoding (Address ➡ LatLng)
          geocoder.geocode(
            { searchText: debouncedAddress },
            (res) => {
              if (res.Response.View.length > 0) {
                const loc = res.Response.View[0].Result[0].Location.DisplayPosition;
                setResult({ lat: loc.Latitude, lng: loc.Longitude });
              } else {
                setError("Address not found.");
              }
              setLoading(false);
            },
            (err) => {
              console.error(err);
              setError("Geocoding failed.");
              setLoading(false);
            }
          );
        } else if (coordinates) {
          // Reverse Geocoding (LatLng ➡ Address)
          geocoder.reverseGeocode(
            {
              prox: `${coordinates.lat},${coordinates.lng}`,
              mode: "retrieveAddresses",
              maxresults: 1,
            },
            (res) => {
              if (res.Response.View.length > 0) {
                const addressLabel = res.Response.View[0].Result[0].Location.Address.Label;
                setResult({ address: addressLabel });
              } else {
                setError("No address found for coordinates.");
              }
              setLoading(false);
            },
            (err) => {
              console.error(err);
              setError("Reverse geocoding failed.");
              setLoading(false);
            }
          );
        }
      } catch (err) {
        console.error(err);
        setError("Unexpected error occurred.");
        setLoading(false);
      }
    };

    performGeocoding();
  }, [debouncedAddress, coordinates]);

  return { result, loading, error };
};


