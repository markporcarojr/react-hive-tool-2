// fetchWeatherData.js

import axios from "axios";

const fetchWeatherData = async (zipcode) => {
  try {
    const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}&units=imperial`
    );

    const { lat, lon } = response.data.coord;
    const weatherMain = response.data.weather[0].main;
    let iconUrl;

    switch (weatherMain) {
      case "Clouds":
        iconUrl = "https://openweathermap.org/img/wn/04d@2x.png";
        break;
      case "Clear":
        iconUrl = "https://openweathermap.org/img/wn/01d@2x.png";
        break;
      case "Rain":
        iconUrl = "https://openweathermap.org/img/wn/09d@2x.png";
        break;
      case "Drizzle":
        iconUrl = "https://openweathermap.org/img/wn/10d@2x.png";
        break;
      case "Mist":
        iconUrl = "https://openweathermap.org/img/wn/50d@2x.png";
        break;
      case "Thunderstorm":
        iconUrl = "https://openweathermap.org/img/wn/11d@2x.png";
        break;
      case "Snow":
        iconUrl = "https://openweathermap.org/img/wn/13d@2x.png";
        break;
      default:
        iconUrl = "";
    }
    const geocodeResponse = await axios.get(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
    );

    const state = geocodeResponse.data[0].state;

    return { data: response.data, iconUrl, state };
  } catch (error) {
    console.error("Fetch weather data error:", error);
    return null;
  }
};

export default fetchWeatherData;
