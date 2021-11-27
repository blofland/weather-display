
const appId = "ba2aac9b1d7724e46122e0527e8241b3"
const baseUrl = "https://api.openweathermap.org/data/2.5"

const getWeather = async (city) => {
    // Make API Calls
    // Return an object that holds information about current and forecast
    try {
        let weather = await getCoordForCity(city)
        weather = {...weather, ...await getDataFromCoord(weather.coord)}
        return weather 
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

getWeather("Salt Lake City")