
const appId = "ba2aac9b1d7724e46122e0527e8241b3"
const baseUrl = "https://api.openweathermap.org/data/2.5"

const getWeather = async (city) => {
    // Make API Calls
    // Return an object that holds information about current and forecast
    try {
        let weatherData = await getCoordForCity(city)
        weatherData = {...weatherData, ...await getDataFromCoord(weatherData.coord)}
        const current = {
            city: weatherData.name, 
            dt: weatherData.dt * 1000,
            humidity: weatherData.current.humidity, 
            uvi: weatherData.current.uvi,
            wind: weatherData.current.wind_speed,
            icon: `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`,
            temp: weatherData.current.temp,
            lat: weatherData.lat, 
            lon: weatherData.lon
        }
    
        const forecast= weatherData.daily.slice(0,5).map(day => {
            return {
                city: weatherData.name, 
                dt: day.dt * 1000, 
                humidity: day.humidity, 
                uvi: day.uvi,
                wind: day.wind_speed,
                icon: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
                temp: day.temp.day,
                lat: weatherData.lat, 
                lon: weatherData.lon
            }
        })
        return {current, forecast}
    } catch(err){
        console.error(err)
        alert("Looks like that was a bad request, check your spelling and try again")
    }
}

const getCoordForCity = async city =>{
    const url = baseUrl + "/weather?q=" + city + "&appid=" + appId 
    return await fetch(url).then(res => res.json())
}

const getDataFromCoord = async coord => {
    const url = `${baseUrl}/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${appId}&units=imperial`
    return await fetch(url).then(res=> res.json())
}
