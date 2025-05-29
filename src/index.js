import "./styles.css";
import getWeatherData from "./getWeather";

const weatherData = await getWeatherData("collegestation");
console.log(weatherData);