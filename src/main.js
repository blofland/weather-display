
const appId = "ba2aac9b1d7724e46122e0527e8241b3"
const baseUrl = "https://api.openweathermap.org/data/2.5"

const getWeather = (city) => {
    // Make API Calls
    // Return an object that holds information about current and forecast
    const firstUrl = baseUrl + "/weather?q=" + city + "&appid=" + appId 
    let prom = fetch(firstUrl).then(res => res.json())
    prom.then(weatherData => {
        const secondUrl = `${baseUrl}/onecall?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${appId}`
        return fetch(secondUrl).then(res => res.json()).then(data => console.log(data))
    })
    return prom 
}

const getCoordForCity = async city =>{
    const url = baseUrl + "/weather?q=" + city + "&appid=" + appId 
    return await fetch(url).then(res => res.json())
}

const getDataFromCoord = coord => {
    const url = `${baseUrl}/onecall?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${appId}&units=imperial`
    return await fetch(url).then(res=> res.json())
}

getWeather("Salt Lake City")