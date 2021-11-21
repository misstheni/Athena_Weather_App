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

function displayForecast(response) {
  console.log(response);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class ="row">`;
  let days = ["SUN", "MON", "TUES", "WED", "THURS"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
                      <div class="col-2">
                        <div class="forecast-day">
                          ${day}
                        </div>
                        <img src="data:image/jpeg;base64,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"
                        alt="Cloudy"
                        width="20px" />
                        <div class="forecast-temp">
                          <span class="forecast-max">65°</span>
                          <span class="forecast-min">50°</span>
                        </div>
                      </div>
                    `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5678cd202ad8609baa4c102a770e20ac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

  getForecast(response.data.coord);
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
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
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
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
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
