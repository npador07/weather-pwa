export default function Header({ onSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
    const city = e.target.city.value;
    if (!city) return;
    onSearch(city);
    e.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="city"
        placeholder="Search city..."
        className="border rounded-lg px-3 py-1"
      />
    </form>
  );
}
