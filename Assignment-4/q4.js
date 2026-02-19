const API_KEY = "YOUR_API_KEY_HERE"; 

const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const loading = document.getElementById("loading");

let cachedCity = "";
let cachedData = null;

function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        showError("Please enter a city name");
        return;
    }

    
    if (city === cachedCity && cachedData) {
        displayWeather(cachedData);
        return;
    }

    loading.style.display = "block";
    weatherResult.innerHTML = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => {
            if (response.status === 404) {
                throw new Error("City not found (404)");
            }
            if (!response.ok) {
                throw new Error("Server error (500)");
            }
            return response.json();
        })
        .then(data => {
            loading.style.display = "none";

           
            cachedCity = city;
            cachedData = data;

            displayWeather(data);
        })
        .catch(error => {
            loading.style.display = "none";
            showError(error.message);
        });
}

function displayWeather(data) {
    weatherResult.className = "weather-box success";
    weatherResult.innerHTML = `
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
    `;
}

function showError(message) {
    weatherResult.className = "weather-box error";
    weatherResult.innerHTML = `<p>${message}</p>`;
}