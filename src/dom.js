import getWeatherData from './getWeather';

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

export default async function render(location){
    const container = document.querySelector(".subCon");
    container.innerHTML = "";
    const data = await getWeatherData(location);
    const locName = document.createElement("h1");
    locName.textContent = "Showing Weather in: "+data.address

    //Now Section
    const weatherNow = document.createElement("div");
    weatherNow.classList.add("now");
    const nowIcon = document.createElement("img");
    nowIcon.src = (await getIcon(data.currentSky)).default;
    const nowTemp = document.createElement("h2");
    nowTemp.innerHTML = data.currentTemp+'\u00B0';
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
        hourTemp.textContent = data.hours[i].temp+'\u00B0';
        hourDiv.append(time, hourIcon,hourTemp);
        hourCon.appendChild(hourDiv);
    }
        
    

    container.append(locName,weatherNow,hourHead,hourCon);
}