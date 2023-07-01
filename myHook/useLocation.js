import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [adresse, setAdresse] = useState(null);


  useEffect(() => {
    const getLocationAsync = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let locationData = await Location.getCurrentPositionAsync({});
        setLocation(locationData);

        if (locationData) {
          fetchLocationData(locationData.coords.latitude, locationData.coords.longitude);
        }
      } catch (error) {
        setErrorMsg('Error getting location: ' + error.message);
      }
    };

    const fetchLocationData = async (latitude, longitude) => {
      try {
        const apiKey = 'AIzaSyA60iPzMNfqN7uovjb1m7uXAyC42RPg4Gc';
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data;

        if (data.results && data.results.length > 0) {
          const addressComponents = data.results[0].address_components;
          const city = getAddressComponentLongName(addressComponents, 'locality');
          const neighborhood = getAddressComponentShortName(addressComponents, 'route');

          // Faites ce que vous voulez avec les valeurs de city et neighborhood
          console.log(addressComponents)
          console.log('City:', city);
          console.log('Neighborhood:', neighborhood);
          setAdresse(city +', '+ neighborhood);
        }
      } catch (error) {
        console.log('Error fetching location data:', error);
      }
    };

    const getAddressComponentShortName = (addressComponents, type) => {
      return addressComponents.find(component => component.types.includes(type))?.short_name || '';
    };
    const getAddressComponentLongName = (addressComponents, type) => {
      return addressComponents.find(component => component.types.includes(type))?.long_name || '';
    };

    getLocationAsync();
  }, []);

  return { location, adresse,errorMsg };
};

export default useLocation;
