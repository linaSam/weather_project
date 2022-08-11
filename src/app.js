// Shows current date

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
      </div>
   `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let link = document.querySelector(".date");
link.innerHTML = `${days[now.getDay()]} ${now.getHours()}:${now.getMinutes()}`;

function showForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2da922df24791569065ef01a6ccbef01";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function weatherInfo(response) {
  windSpeed = response.data.wind.speed;
  document.querySelector(".windInfo").innerHTML = Math.round(windSpeed);

  humidityCoefficient = response.data.main.humidity;
  document.querySelector(".humidityInfo").innerHTML = humidityCoefficient;

  let descriptionElement = document.querySelector(".type_weather");
  descriptionElement.innerHTML = response.data.weather[0].description;

  showForecast(response.data.coord);
}

function tempInfo(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#place").innerHTML = response.data.name;
  document.querySelector("#tempNumber").innerHTML =
    Math.round(celsiusTemperature);

  let iconElement = document.querySelector("#big_image");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  weatherInfo(response);
}

function findCity(city) {
  let apiKey = "2da922df24791569065ef01a6ccbef01";
  let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiCity).then(tempInfo);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  findCity(city);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempNumber");

  celsiusSign.classList.remove("active");
  fahrenheitSign.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusSign.classList.add("active");
  fahrenheitSign.classList.remove("active");
  let temperatureElement = document.querySelector("#tempNumber");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let windSpeed = null;
let humidityCoefficient = null;

let cityInfo = document.querySelector("#city-form");
cityInfo.addEventListener("submit", submitCity);

let fahrenheitSign = document.querySelector("#fahrenheit");
fahrenheitSign.addEventListener("click", showFahrenheit);

let celsiusSign = document.querySelector("#celsius");
celsiusSign.addEventListener("click", showCelsius);

findCity("Kyiv");
displayForecast();
