import getWeatherData from './getWeather';
import {format} from "date-fns";

function getIcon(sky) {
    sky = sky.toString();
    const s = sky.toLowerCase();
    if (s.includes('thunder'))   return import('./assets/images/thunder.svg');
    if (s.includes('rain'))      return import('./assets/images/rainy.svg');
    if (s.includes('partially')) return import('./assets/images/partlyCloudy.svg');
    if (s.includes('cloudy'))    return import('./assets/images/cloudy.svg');
    if (s.includes('overcast'))    return import('./assets/images/cloudy.svg');
    return import('./assets/images/sunny.svg');
  }
function toC(F){
    return Math.round(((F-32)*(5/9))*10)/10;
}

export default async function render(location, C){
    const container = document.querySelector(".subCon");
    container.innerHTML = "";
    const data = await getWeatherData(location);
    const locName = document.createElement("h1");
    locName.textContent = "Showing Weather in: "+data.address

    //F/C Section
    const far = document.querySelector("#f");
    const cel = document.querySelector("#c");
    if(C){
        far.classList.add("faded");
        cel.classList.remove("faded");
    }
    else{
        far.classList.remove("faded");
        cel.classList.add("faded");
    }

    //Now Section
    const weatherNow = document.createElement("div");
    weatherNow.id = "now";
    const nowIcon = document.createElement("img");
    nowIcon.src = (await getIcon(data.currentSky)).default;
    const nowTemp = document.createElement("h2");
    nowTemp.innerHTML = C ? toC(data.currentTemp)+'\u00B0' : data.currentTemp+'\u00B0';
    weatherNow.append(nowIcon, nowTemp);

    //Hourly Section
    const hourHead = document.createElement("h1");
    hourHead.textContent = "Hourly Forecast:";
    const hourCon = document.createElement("div");
    hourCon.classList.add("hourCon");
    for (let i = 0; i < 24; i++) {
        const hourDiv = document.createElement("div");
        hourDiv.classList.add("hour");
        const time = document.createElement("h3");
        time.textContent = i+":00";
        const hourIcon = document.createElement("img");
        hourIcon.src = (await getIcon(data.hours[i].sky)).default;
        const hourTemp = document.createElement("h3");
        hourTemp.textContent = C ? toC(data.hours[i].temp)+'\u00B0' : data.hours[i].temp+'\u00B0';
        hourDiv.append(time, hourIcon,hourTemp);
        hourCon.appendChild(hourDiv);
    }
        
    //7-Day section
    const weekHead = document.createElement("h1");
    weekHead.textContent = "7-day Forecast";
    const weekCon = document.createElement("div");
    weekCon.id = "week";
    for (let i = 0; i < 7; i++) {
        const d = data.days[i];
        const dayCon = document.createElement("div");
        dayCon.classList.add("day");
        const date = document.createElement("h3");
        switch(i){
            case 0: date.innerText = "Today"
            break;
            case 1: date.innerText = "Tomorrow"
            break;
            default: date.innerText = format(d.date, "MM/dd");
        }
        const dayIcon = document.createElement("img");
        dayIcon.src = (await getIcon(d.sky)).default;
        const highLow = document.createElement("h4");
        highLow.innerHTML = C ? "H: "+toC(d.high)+'\u00B0 <br><br> L: '+toC(d.low)+'\u00B0': "H: "+d.high+'\u00B0 <br><br> L: '+d.low+'\u00B0';
        dayCon.append(date,dayIcon,highLow);
        weekCon.appendChild(dayCon);
    }


    container.append(locName,weatherNow,hourHead,hourCon,weekHead,weekCon);
}