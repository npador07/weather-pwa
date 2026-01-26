export default function CurrentWeather({ data }) {
  return (
    <section className="bg-blue-500 text-white rounded-2xl p-6 text-center">
      <h2 className="text-2xl font-semibold">{data.name}</h2>
      <p className="text-6xl font-bold">
        {Math.round(data.main.temp)}°
      </p>
      <p className="capitalize">{data.weather[0].description}</p>
    </section>
  );
}
