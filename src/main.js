const [getStore, setStore] = useStorage("searches", [])

document.querySelector("form").addEventListener("submit", handleSearch)
document.querySelector("button").addEventListener("click", clearHistory)
document.addEventListener("DOMContentLoaded", async () =>{
    const currentCity = getStore()[0]
    if(currentCity){
        const weatherData = await getWeather(currentCity)
        display(weatherData)
        addSearchToStorage(currentCity)
    } else {
        setDefault()
    }
})




function setDefault(){
    const list = document.getElementById("search-history-list")
    list.innerHTML= ""
    display()
}


async function handleSearch(e) {
    e.preventDefault()
    const searchValue = e.target.elements[0].value
    try {
    const weatherData = await getWeather(searchValue)
    display(weatherData)
    addSearchToStorage(weatherData.current.city)
    e.target.reset()
    } catch(err){
        console.error(err)
        alert("Check you're spelling and try again")
    }
}

function addSearchToStorage(city){
    setStore(s => s.filter(search=> search !== city))
    setStore(s =>{
        s.unshift(city)
        return s 
    })
    populateHistory(city)
}

function populateHistory(activeCity){
    const currentStore = getStore()
    const list = document.getElementById("search-history-list")
    list.innerHTML= ""

    currentStore.forEach((search) => {
        
        const link = document.createElement("a")
        link.addEventListener("click", searchCity)

        const li = document.createElement("li")
        const className = search === activeCity ? "active list-group-item" : "text-muted list-group-item" 
        li.className = className
        li.innerText = search

        list.append(link)
        link.append(li)
    })
}

async function searchCity(e) {
    const city = e.target.innerText
    const weatherData = await getWeather(city)
    display(weatherData)
    populateHistory(city)
}

function clearHistory(e){
    setStore(s => [])
    setDefault()
}

function display(weatherData){    
    if(!weatherData) return document.querySelector("main").style.display = "none"
    document.querySelector("main").style.display = "block"
    displayCurrent(weatherData.current)
    displayForecast(weatherData.forecast)
 }

function displayForecast(weatherData){
    const row = document.querySelector("#forecast-cards")
    row.innerHTML = ""
    weatherData.forEach(day => {
        const col = document.createElement("div")
        col.className = "col"
        row.append(col)

        const card = document.createElement("div")
        card.className = "text-white bg-secondary p-3 mb-3 card mx-auto"
        col.append(card)

        const img = document.createElement("img")
        img.className="card-image-top"
        img.src = day.icon
        card.append(img)

        const cardBody = document.createElement("div")
        cardBody.className="card-body"
        card.append(cardBody)

        const dateTitle = document.createElement("h5")
        dateTitle.className = "card-title"
        dateTitle.innerText = new Date(day.dt).toDateString()
        card.append(dateTitle)

        const temp = document.createElement("div")
        temp.className="card-text"
        temp.innerText = `Temp: ${day.temp}°F`
        card.append(temp)

        const wind = document.createElement("div")
        wind.className = "card-text"
        wind.innerText = `Wind: ${day.wind} MPH`
        card.append(wind)

        const humidity = document.createElement("div")
        humidity.className = "card-text"
        humidity.innerText = `Humidity: ${day.humidity} MPH`
        card.append(humidity)

    })
  
}

function displayCurrent(data){
    document.querySelector("#city-name").innerText = data.city
    document.querySelector("#current-icon").src = data.icon 
    document.querySelector("#current-date").innerText = new Date(data.dt).toDateString()
    const currentDataNodes = document.querySelectorAll("#current-weather li span")
    currentDataNodes[0].innerText = data.temp
    currentDataNodes[1].innerText = data.wind 
    currentDataNodes[2].innerText = data.humidity 
    currentDataNodes[3].innerText = data.uvi
}