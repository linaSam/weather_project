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

let link = document.querySelector(".date");
link.innerHTML = `${days[now.getDay()]} ${now.getHours()}:${now.getMinutes()}`;

function tempInfo(response) {
    document.querySelector("#place").innerHTML = response.data.name;
    document.querySelector("#tempNumber").innerHTML = Math.round(response.data.main.temp);
    
    let iconElement = document.querySelector("#big_image");
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
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

let cityInfo = document.querySelector("#city-form");
cityInfo.addEventListener("submit", submitCity);

findCity("London");
