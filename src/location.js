/**
 * @typedef {Object} Coordinate
 * @property {Number} latitude
 * @property {Number} longitude
 */

/**
 *
 * @returns {Coordinate}
 */
export const getCoordinates = async () => {
  const res = navigator.geolocation.getCurrentPosition((data) => {
    const { latitude, longitude } = data.coords;
    coordinate = { latitude, longitude };
    return coordinate;
  });
  return coordinate;
};

export async function getUserCity(coords) {
  const citiesResponse = await fetch("/data/cities.json");
  const cities = await citiesResponse.json();
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const citiesInTimeZone = cities.filter(
    (city) => city.timezone == userTimezone
  );
  const closest = findClosestCity(coords, citiesInTimeZone);
  return closest;
}

function getDistanceBetweenCoordinates(start, end) {
  return Math.sqrt(
    Math.pow(start.latitude - end.latitude, 2) +
      Math.pow(start.longitude - end.longitude, 2)
  );
}

function findClosestCity(coord, cities) {
  const mappedCities = cities.map((city) => ({
    city,
    distance: getDistanceBetweenCoordinates(coord, {
      latitude: city.coordinates.lat,
      longitude: city.coordinates.lon,
    }),
  }));
  const distances = mappedCities.map((city) => city.distance);
  const closest = Math.min(...distances);
  const closestCity = mappedCities.find((city) => city.distance == closest);
  return closestCity.city;
}
