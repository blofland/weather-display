const [getStore, setStore] = useStorage("searches", [])

document.querySelector("form").addEventListener("submit", handleSearch)

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
}

