const parentTag = document.querySelector('#weatherCard')


// writing a default zipcode
let zip = localStorage.getItem("zip")
if (zip == null) {
    let defaultZip = "10001"
    localStorage.setItem("zip", defaultZip)
    zip = defaultZip
}


// setting the path to the API on weather
const myKey = "06b5f053474c3d554fe57b4524ec2dfa"
const myPath = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${myKey}&units=imperial`


// fetch the remote JSON data for the current weather
fetch(myPath)
    .then((response) => response.json())
    .then((allData) => {
        console.log(allData)
        displayWeather(allData)
    })

// function that displays the current weather
function displayWeather(fetchData) {
    // location
    const location = document.querySelector("#location")
    location.textContent = `Local weather for ${fetchData.name}`

    // date
    const date = document.createElement("p")
    date.className = "date"
    const today = new Date()
    date.textContent = today.toLocaleDateString()
    parentTag.appendChild(date)
    // weather icon
    const weatherIcon = document.createElement("img")
    weatherIcon.src = `https://openweathermap.org/img/wn/${fetchData.weather[0].icon}@2x.png`
    weatherIcon.alt = fetchData.weather[0].description
    const iconBubble = document.createElement("div")
    iconBubble.className = "icon-bubble"
    iconBubble.appendChild(weatherIcon)
    parentTag.appendChild(iconBubble)

    // div for stats
    const statGrid = document.createElement("div")
    statGrid.className = "stat-grid"
    parentTag.appendChild(statGrid)
    // temperature
    const temp = document.createElement("p")
    temp.className = "temp"
    temp.textContent = `${Math.round(fetchData.main.temp)}°F`
    statGrid.appendChild(temp)
    // description
    const description = document.createElement("p")
    description.className = "description"
    description.textContent = fetchData.weather[0].description
    statGrid.appendChild(description)
    // feels like
    const feelsLike = document.createElement("p")
    feelsLike.className = "feels-like"
    feelsLike.textContent = `Feels like: ${Math.round(fetchData.main.feels_like)}°F`
    statGrid.appendChild(feelsLike)
    // wind speed
    const windSpeed = document.createElement("p")
    windSpeed.className = "wind-speed"
    windSpeed.textContent = `Wind speed: ${Math.round(fetchData.wind.speed)} mph`
    statGrid.appendChild(windSpeed)

    

}

// ask for a new zipcode
const modal = document.querySelector('aside')
const settingsBtn = document.querySelector('#settings')
settingsBtn.addEventListener("click", () => {
    modal.classList.toggle("show")
})

// close modal without changing zip
const closeBtn = document.querySelector('#closeAside')
closeBtn.addEventListener("click", () => {
    modal.classList.remove("show")
})

// set new zip
const submitBtn = document.querySelector('#applyZip')
submitBtn.addEventListener("click", () => {
    modal.classList.remove("show")
    let newZip = document.querySelector('#zip').value
    if (newZip.length === 5) {
    localStorage.setItem("zip", newZip)
    }
    location.reload()
})


// validate zip
input = document.querySelector('#zip')
input.addEventListener("input", () => {
    input.value = input.value.slice(0, 5)
})