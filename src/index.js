import "./styles.css";
import getWeatherData from "./getWeather";

const weatherData = await getWeatherData("navasota");
console.log(weatherData);