//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY

export default async function getWeatherData(location){
    const request = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+location+'?key=V4DL2LQWY6C7JZRDVDVET9DN4');
    const raw =  await request.json();
    const prettyWeather = {
        address: raw.resolvedAddress,
        currentSky: raw.currentConditions.conditions,
        currentTemp: raw.currentConditions.temp,
        hours: [],
        days: []
    }
    for (let i = 0; i < 24; i++) {
        const r = raw.days[0].hours[i];
        prettyWeather.hours[i] = {
            sky: r.conditions,
            temp: r.temp
        }
    }
    for (let i = 0; i < 7; i++) {
        const r = raw.days[i];
        prettyWeather.days[i] = {
            date: r.datetime,
            sky: r.conditions,
            low: r.tempmin,
            high: r.tempmax,
        }
    }
    console.log(raw);
    return prettyWeather;
}