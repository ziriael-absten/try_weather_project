let now = new Date();
let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"];
let day = week[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (String(minutes).length < 2) {
  minutes = "0" + minutes;
}
let current_time = day + " " + hours + ":" + minutes;

let time = document.querySelector("#time");
time.innerHTML = current_time;

function showCity(event) {
  event.preventDefault();
  let enter_city = document.querySelector("#enter-city");
  let city = document.querySelector("#city");
  city.innerHTML = enter_city.value;
  let city_value = enter_city.value;
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city_value +
    "&units=metric&appid=" +
    apiKey;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = temperature + "° C";
}

let form = document.querySelector("form");
form.addEventListener("submit", showCity);

let apiKey = "c6b24904ab14ebc2fc4d82be19770cb4";

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=metric" +
    "&appid=" +
    apiKey;
  // console.log(url);
  axios.get(url).then(getCurrentData);
}

function getCurrentData(response) {
  let current_temperature = Math.round(response.data.main.temp);
  let current_city = response.data.name;
  let temp = document.querySelector("#current-temp");
  let city = document.querySelector("#city");
  city.innerHTML = current_city;
  temp.innerHTML = current_temperature;
}

let button = document.querySelector("button");
button.addEventListener("click", getPosition);
