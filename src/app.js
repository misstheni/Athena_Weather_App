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

let apiKey = "5678cd202ad8609baa4c102a770e20ac";
let city = "Reno";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
