const GeoLocation = {
  TO_RADIAN: 0.0174532925,
  TO_DEGREE: 57.2957795,
  EARTH_RADIUS: 6371.01,
  TO_MILE: 0.621371192,
  TO_KM: 1.609344,

  degreeToRadian: (degree) => {
    return degree * GeoLocation.TO_RADIAN;
  },
  radianToDegree: (radian) => {
    return radian * GeoLocation.TO_DEGREE;
  },
  kmToMile: (km) => {
    return km * GeoLocation.TO_MILE;
  },
  mileToKm: (mile) => {
    return mile * GeoLocation.TO_KM;
  },

  calculateDelta: (points, userLocation) => {
    let minX, maxX, minY, maxY;

    minX = userLocation.latitude;
    maxX = userLocation.latitude;
    minY = userLocation.longitude;
    maxY = userLocation.longitude;

    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;

    const deltaX = (maxX - minX) + .075;
    const deltaY = (maxY - minY) + .075;

    return { latitude: midX, longitude: midY, latitudeDelta: deltaX, longitudeDelta: deltaY };
  },

  distance: (location1, location2) => {
    return Math.acos(Math.sin(location1.radLat) * Math.sin(location2.radLat) +
        Math.cos(location1.radLat) * Math.cos(location2.radLat) *
        Math.cos(location1.radLon - location2.radLon)) * GeoLocation.EARTH_RADIUS;
  },
};

export default GeoLocation;
