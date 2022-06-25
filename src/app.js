function search(event) {
  event.preventDefault();
  let inputValue = document.querySelector("#text").value;
  inputValue.toLowerCase().trim();
  cities.innerHTML = inputValue;
  let OpenWeather = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
  axios.get(OpenWeather).then(weatherNow);
}
function weatherNow(response) {
  todayTemp.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)} %`;
  document.querySelector("#h1").innerHTML = `${response.data.name} ${Math.round(
    response.data.main.temp
  )} °C`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  windy.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  todayTempIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function weatherCurrently() {
  navigator.geolocation.getCurrentPosition(handlePosition);
  function handlePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let OpenWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(OpenWeather).then(function (response) {
      todayTemp.innerHTML = Math.round(response.data.main.temp);
      humidity.innerHTML = `Humidity: ${Math.round(
        response.data.main.humidity
      )} %`;
      document.querySelector("#h1").innerHTML = `${
        response.data.name
      } ${Math.round(response.data.main.temp)} °C`;
      document.querySelector("#description").innerHTML =
        response.data.weather[0].main;
      cities.innerHTML = `${response.data.name}`;
      windy.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
      todayTempIcon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
    });
  }
}
function weatherMalmo() {
  let city = "Malmo";
  let OpenWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(OpenWeather).then(weatherNowMalmo);
}
function weatherNowMalmo(response) {
  todayTemp.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)} %`;
  document.querySelector("#h1").innerHTML = `${response.data.name} ${Math.round(
    response.data.main.temp
  )} °C`;
  cities.innerHTML = `${response.data.name}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  windy.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  todayTempIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
let apiKey = `5b2b2fb0b29cccfcd7bfb15b10fda1fd`;
let windy = document.querySelector("#wind");
let humidity = document.querySelector("#humidity");
let todayTemp = document.querySelector("#todayTemp");
let todayTempIcon = document.querySelector("#todayTempIcon");
let cities = document.querySelector("#cities");
let currently = document.querySelector("#currently");
currently.addEventListener("click", weatherCurrently);
let form = document.querySelector("#input-form");
form.addEventListener("submit", search);
let today = document.querySelector("#date");
let now = new Date();
let days = [
  "Saturday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sunday",
];
let dayWeek = days[now.getDay()];
let time = now.getHours();
let minutes = now.getMinutes();
today.innerHTML = `${dayWeek} ${time}:${minutes}`;

weatherCurrently();
weatherMalmo();
