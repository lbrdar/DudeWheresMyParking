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

    const deltaX = (maxX - minX) + 0.01;
    const deltaY = (maxY - minY) + 0.01;

    return { latitude: midX, longitude: midY, latitudeDelta: deltaX, longitudeDelta: deltaY };
  },

  /**
   * Returns the circle bounds - top right and bottom left points
   * (see http://stackoverflow.com/questions/15319431/how-to-convert-a-latlng-and-a-radius-to-a-latlngbounds-in-android-google-maps-ap)
   *
   * @param   {object} center
   * @param   {number} radius (in meters)
   * @returns {object} object containing SW and NE bounds
   */
  getCircleBounds: (center, radius) => {
    const southwest = GeoLocation.getPoint(center, radius * Math.sqrt(2.0), 225);
    const northeast = GeoLocation.getPoint(center, radius * Math.sqrt(2.0), 45);

    return {southwest, northeast };
  },

  /**
   * Returns the destination point from ‘this’ point having travelled the given distance on the
   * given initial bearing (bearing normally varies around path followed).
   *
   * @param   {object} source - source point from which we calculate distance
   * @param   {number} distance - Distance travelled, in same units as earth radius (default: metres).
   * @param   {number} bearing - Initial bearing in degrees from north.
   * @returns {object} Destination point.
   *
   * Formula: (see http://williams.best.vwh.net/avform.htm#LL)
   *   sinφ2 = sinφ1⋅cosδ + cosφ1⋅sinδ⋅cosθ
   *   tanΔλ = sinθ⋅sinδ⋅cosφ1 / cosδ−sinφ1⋅sinφ2
   */
  getPoint: (source, distance, bearing) => {
    const geoRadius = 6371e3;     // (Mean) radius of earth (in metres)
    const δ = distance / geoRadius; // angular distance in radians
    const θ = GeoLocation.degreeToRadian(bearing);
    const φ1 = GeoLocation.degreeToRadian(source.latitude);
    const λ1 = GeoLocation.degreeToRadian(source.longitude);

    const φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));
    const y = Math.sin(θ) * Math.sin(δ) * Math.cos(φ1);
    const x = Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2);
    const λ2 = λ1 + Math.atan2(y, x);

    return {
      latitude: GeoLocation.radianToDegree(φ2),
      longitude: (GeoLocation.radianToDegree(λ2) + 540) % 360 - 180 // normalise to −180..+180°
    };
  },

  distance: (location1, location2) => {
    return Math.acos(Math.sin(location1.radLat) * Math.sin(location2.radLat) +
        Math.cos(location1.radLat) * Math.cos(location2.radLat) *
        Math.cos(location1.radLon - location2.radLon)) * GeoLocation.EARTH_RADIUS;
  },
};

export default GeoLocation;
