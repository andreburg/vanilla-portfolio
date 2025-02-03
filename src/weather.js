const weatherApiBaseUrl =
  "https://api.open-meteo.com/v1/forecast?current=temperature_2m&";

function formatCoordinateQueryParams({ latitude, longitude }) {
  return `latitude=${latitude}&longitude=${longitude}`;
}

export async function getCoordinateWeather({ latitude, longitude }) {
  const endpoint =
    weatherApiBaseUrl + formatCoordinateQueryParams({ latitude, longitude });
  const response = await fetch(endpoint);
  const data = await response.json();

  const temperature = data?.current?.temperature_2m;

  return { temperature };
}
