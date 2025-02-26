import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [city, setCity] = useState("null");
  let [loaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState({});

  function temperature(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function submit(event) {
    event.preventDefault();
    let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(temperature);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={submit}>
      <input
        type="search"
        className="field"
        placeholder="Enter a city.."
        onChange={updateCity}
      />
      <button type="Submit" className="search">
        Search
      </button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}

        <span className="properties">
          {" "}
          <p>Temperature: {Math.round(weather.temperature)}°C</p>
          <p>Description: {weather.description}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind: {Math.round(weather.wind)}km/h</p>
        </span>
        <br />
        <img src={weather.icon} alt={weather.description} />
      </div>
    );
  } else {
    return form;
  }
}
