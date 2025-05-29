import "./styles.css";
import getWeatherData from "./getWeather";
import render from "./dom";

const weatherData = await getWeatherData("college station");
console.log(weatherData);

const search = document.querySelector("input");
search.addEventListener("keydown", e => {
    if(e.key == "Enter") render(search.value);
});

render("College Station");