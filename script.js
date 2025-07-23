const API_KEY = "331ca92302e15a439c9d10c2f72bc394";

async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const country = document.getElementById("country").value.trim();
    const resultDiv = document.getElementById("result");

    if (!city || !country) {
        resultDiv.innerHTML = "⚠️ Please enter both city and country.";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;

    try {
        resultDiv.innerHTML = "🔄 Fetching weather data...";

        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found or invalid input");

        const data = await response.json();
        const condition = data.weather[0].main;

        const imageUrl = getWeatherIcon(condition);

        const weather = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="${imageUrl}" alt="${condition}" style="width:100px;height:100px;">
      <p><strong>🌡️ Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>🌥️ Condition:</strong> ${condition}</p>
      <p><strong>💧 Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>🌬️ Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;

        resultDiv.innerHTML = weather;

    } catch (error) {
        resultDiv.innerHTML = `<p>❌ Error: ${error.message}</p>`;
    }
}

function getWeatherIcon(condition) {
    switch (condition.toLowerCase()) {
        case "clear":
            return "https://cdn-icons-png.flaticon.com/512/869/869869.png";
        case "clouds":
            return "https://cdn-icons-png.flaticon.com/512/414/414825.png";
        case "rain":
            return "https://cdn-icons-png.flaticon.com/512/414/414974.png";
        case "drizzle":
            return "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
        case "thunderstorm":
            return "https://cdn-icons-png.flaticon.com/512/1146/1146869.png";
        case "snow":
            return "https://cdn-icons-png.flaticon.com/512/642/642102.png";
        case "mist":
        case "haze":
        case "fog":
            return "https://cdn-icons-png.flaticon.com/512/1197/1197102.png";
        case "wind":
            return "https://cdn-icons-png.flaticon.com/512/3075/3075858.png";
            return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
    }
}
