import { getUserCity } from "./location.js";
import { getCoordinateWeather } from "./weather.js";

const weatherElement = document.querySelector("#weather");
const locationElement = document.createElement("div");
const temperatureElement = document.createElement("div");

weatherElement.ariaHidden = "true";

async function renderWeatherElement({ coords }) {
  const { latitude, longitude } = coords;

  const weather = await getCoordinateWeather({ latitude, longitude });
  const city = await getUserCity(coords);

  const emoji = document.createElement("div");
  emoji.innerText =
    weather.temperature > 10 ? (weather.temperature > 20 ? "🥵" : "😐") : "🥶";

  locationElement.innerText = city.name;
  locationElement.className = "location";
  temperatureElement.innerText = weather.temperature + "°C";

  weatherElement.appendChild(locationElement);
  weatherElement.appendChild(temperatureElement);
  weatherElement.appendChild(emoji);

  weatherElement.ariaHidden = "false";
}

navigator.geolocation.getCurrentPosition(renderWeatherElement);
