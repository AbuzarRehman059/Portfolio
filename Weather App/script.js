const apiKey = "f673d1b1ceed75e908858fa3008b2aca";

function getWeather() {
    let city = document.getElementById("cityInput").value;

    if (city === "") return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
        document.getElementById("city").innerText = data.name;
        document.getElementById("temp").innerText = "Temp: " + data.main.temp + "°C";
        document.getElementById("desc").innerText = "Weather: " + data.weather[0].description;
        document.getElementById("humidity").innerText = "Humidity: " + data.main.humidity + "%";
    })
    .catch(() => {
        alert("City not found!");
    });
}