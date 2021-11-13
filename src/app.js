function displayTemperature(response) {
  console.log(response.data);
}

let apiKey = "5678cd202ad8609baa4c102a770e20ac";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
