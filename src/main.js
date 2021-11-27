document.querySelector("form").addEventListener("submit", handleSearch)

function handleSearch(e) {
    e.preventDefault()
    const searchValue = e.target.elements[0].searchValue
    const weatherData = await getWeather(searchValue)
}