function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let dayInteger = date.getDate();
  return `${day}, ${month} ${dayInteger}`;
}
function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (hours >= 12) {
    minutes = `${minutes} PM`;
  } else {
    minutes = `${minutes} AM`;
  }
  return `${hours}:${minutes}`;
}

function displayTemperature(response) {
  let mainTempElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#input-city-result");
  let highLowElements = document.querySelector("#high-low-temps");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#weather-description");
  let dateElement = document.querySelector("#current-date");
  let timeElement = document.querySelector("#current-time");
  let iconElement = document.querySelector("#weather-icon");
  mainTemp = Math.round(response.data.main.temp);
  minTemp = Math.round(response.data.main.temp_min);
  maxTemp = Math.round(response.data.main.temp_max);
  mainTempElement.innerHTML = `${Math.round(response.data.main.temp)}°`;
  cityElement.innerHTML = response.data.name;
  highLowElements.innerHTML = `${Math.round(
    response.data.main.temp_max
  )}° / ${Math.round(response.data.main.temp_min)}°`;
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

function search(city) {
  let apiKey = "5678cd202ad8609baa4c102a770e20ac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input-box");
  search(cityInput.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let highLowTempElement = document.querySelector("#high-low-temps");
  let fahrenheitMainTemp = (mainTemp * 9) / 5 + 32;
  let fahrenheitMinTemp = (minTemp * 9) / 5 + 32;
  let fahrenheitMaxTemp = (maxTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitMainTemp)}°`;
  highLowTempElement.innerHTML = `${Math.round(
    fahrenheitMaxTemp
  )}° / ${Math.round(fahrenheitMinTemp)}°`;
}
function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let highLowTempElement = document.querySelector("#high-low-temps");
  let celsiusMainTemp = mainTemp;
  let celsiusMinTemp = minTemp;
  let celsiusMaxTemp = maxTemp;
  temperatureElement.innerHTML = `${Math.round(celsiusMainTemp)}°`;
  highLowTempElement.innerHTML = `${Math.round(celsiusMaxTemp)}° / ${Math.round(
    celsiusMinTemp
  )}°`;
}

let mainTemp = null;
let maxTemp = null;
let minTemp = null;

let form = document.querySelector("#input-city-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

search("Los Angeles");
