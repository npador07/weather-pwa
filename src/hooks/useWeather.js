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

    const key = import.meta.env.VITE_WEATHER_API_KEY;
    const storageKey = `weather-${city.trim().toLowerCase()}`;

    async function fetchWeather() {
      setLoading(true);
      setError(null);

      try {
        const [currentRes, forecastRes] = await Promise.all([
          fetch(`${CURRENT_URL}?q=${city}&units=metric&appid=${key}`),
          fetch(`${FORECAST_URL}?q=${city}&units=metric&appid=${key}`)
        ]);

        if (!currentRes.ok) throw new Error("City not found");

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        const slicedForecast = forecastData.list.slice(0, 5);

        setCurrent(currentData);
        setForecast(slicedForecast);

        // Save to localStorage
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            current: currentData,
            forecast: slicedForecast
          })
        );

      } catch (err) {
        console.log("Fetch failed:", err);

        const saved = localStorage.getItem(storageKey);

        if (saved) {
          const parsed = JSON.parse(saved);
          setCurrent(parsed.current);
          setForecast(parsed.forecast);
          setError("Offline — showing last saved data");
        } else {
          setCurrent(null);
          setForecast([]);
          setError("No internet connection");
        }
      }

      setLoading(false);
    }

    fetchWeather();
  }, [city]);

  return { current, forecast, loading, error };
}
