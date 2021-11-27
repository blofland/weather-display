const [getStore, setStore] = useStorage("searches", [])

document.querySelector("form").addEventListener("submit", handleSearch)
document.querySelector("button").addEventListener("click", clearHistory)


function handleSearch(e) {
    e.preventDefault()
    const searchValue = e.target.elements[0].searchValue
    const weatherData = await getWeather(searchValue)
}

function addSearchToStorage(city){
    setStore(s => s.filter(search=> search !== city))
    setStore(s =>{
        s.unshift(city)
        return s 
    })
    popluateHistory(city)
}

function popluateHistory(activeCity){
    const currentStore = getStore()
    const list = document.getElementById("search-history-list")
    list.innerHTML= ""

    currentStore.forEach((search) => {
        
        const link = document.createElement("a")
        link.addEventListener("click", searchCity)

        const li = document.createElement("li")
        const className = search === activeCity ? "active" : "text-muted" 
        li.className = className
        li.innerText = search

        list.append(list)
        li.append(link)
    })
}

async function searchCity(e) {
    const city = e.target.innerText
    const weatherData = await getWeather(city)
    popluateHistory(city)
}

function clearHistory(e){
    setStore(s => [])
}