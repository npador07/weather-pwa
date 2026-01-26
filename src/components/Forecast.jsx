export default function Forecast({ data }) {
  return (
    <section>
      <h3 className="font-semibold mb-2">Forecast</h3>
      <div className="flex gap-3 overflow-x-auto">
        {data.map((item, i) => (
          <div key={i} className="bg-white p-3 rounded-xl text-center shadow min-w-[80px]">
            <p className="text-sm">
              {new Date(item.dt_txt).toLocaleDateString()}
            </p>
            <p className="font-semibold">
              {Math.round(item.main.temp)}°
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
