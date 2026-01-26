import { useState } from "react";
import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import OfflineBanner from "./components/OfflineBanner";
import useWeather from "./hooks/useWeather";

export default function App() {
  const [city, setCity] = useState("Manila");
  const { current, forecast, loading, error } = useWeather(city);

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <OfflineBanner />
      <Header onSearch={setCity} />

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {current && (
        <>
          <CurrentWeather data={current} />
          <WeatherDetails data={current} />
          <Forecast data={forecast} />
        </>
      )}
    </div>
  );
}
