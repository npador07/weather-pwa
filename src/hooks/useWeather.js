import { useEffect, useState } from "react";

const CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export default function useWeather(city) {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);

        const key = import.meta.env.VITE_WEATHER_API_KEY;

        const [currentRes, forecastRes] = await Promise.all([
          fetch(`${CURRENT_URL}?q=${city}&units=metric&appid=${key}`),
          fetch(`${FORECAST_URL}?q=${city}&units=metric&appid=${key}`)
        ]);

        if (!currentRes.ok) throw new Error("City not found");

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        setCurrent(currentData);
        setForecast(forecastData.list.slice(0, 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city]);

  return { current, forecast, loading, error };
}
