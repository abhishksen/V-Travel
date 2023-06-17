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
