export default function WeatherDetails({ data }) {
  return (
    <section className="grid grid-cols-2 gap-4">
      <Detail label="Humidity" value={`${data.main.humidity}%`} />
      <Detail label="Wind" value={`${data.wind.speed} m/s`} />
      <Detail label="Pressure" value={`${data.main.pressure} hPa`} />
      <Detail label="Feels Like" value={`${Math.round(data.main.feels_like)}°`} />
    </section>
  );
}

function Detail({ label, value }) {
  return (
    <div className="bg-white p-4 rounded-xl text-center shadow">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
