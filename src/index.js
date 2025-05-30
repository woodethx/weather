import "./styles.css";
import getWeatherData from "./getWeather";
import render from "./dom";

let currentLoc = "college station";
let unit = false; 
const weatherData = await getWeatherData(currentLoc);
console.log(weatherData);

const search = document.querySelector("input");
search.addEventListener("keydown", e => {
    currentLoc = search.value;
    if(e.key == "Enter") render(currentLoc, unit);
});

const units = document.querySelector(".units");
units.addEventListener("click", () => {
    unit ? unit = false : unit = true;
    render(currentLoc, unit);
})
render(currentLoc);