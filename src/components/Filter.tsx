interface FilterProps {
  onFilter: (filter: string) => void;
}

export default function Filter({ onFilter }: FilterProps) {
  return (
    <>
      <label htmlFor="filter">Filter by region:</label>
      <select
        name="filter"
        onChange={(e) => {
          onFilter(e.target.value);
        }}
      >
        <option value="all">All regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Antarctic">Antarctic</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </>
  );
}
