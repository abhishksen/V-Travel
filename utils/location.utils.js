import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

export const requestLocationPermission = () =>
  new Promise((resolve, reject) => {
    const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

    PermissionsAndroid.request(permission)
      .then(granted => {
        if (granted === 'granted') {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(e => {
        reject(e);
      });
  });

export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const cords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading: position?.coords?.heading,
          speed: position.coords.speed,
        };
        resolve(cords);
      },
      error => {
        reject(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });

export function haversine(lat1, lon1, lat2, lon2) {
  /**
   * Calculate the great circle distance between two points
   * on the earth (specified in decimal degrees)
   */
  const toRadians = degrees => (degrees * Math.PI) / 180;

  // Convert decimal degrees to radians
  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);

  // Haversine formula
  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = 6371 * c; // Radius of the Earth in kilometers

  return distance;
}

export function formatDistance(distance) {
  if (!distance) {
    return null;
  }

  distance = Number(distance);

  if (distance < 1) {
    // If the distance is less than 1 kilometer, convert it to meters
    const meters = distance * 1000;
    return `${meters} meters`;
  } else {
    // If the distance is 1 kilometer or more, keep it in kilometers
    return `${distance.toFixed(2)} kilometers`;
  }
}
