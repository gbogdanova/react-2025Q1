interface SortProps {
  onSort: (sort: string) => void;
}

export default function Sort({ onSort }: SortProps) {
  return (
    <div>
      <label htmlFor="sort" className="mr-3">
        Sort:
      </label>
      <select
        name="sort"
        defaultValue=""
        onChange={(e) => {
          onSort(e.target.value);
        }}
      >
        <option value="">No Sort</option>
        <option value="1">Population ↑</option>
        <option value="2">Population ↓</option>
        <option value="3">Name A–Z</option>
        <option value="4">Name Z–A</option>
      </select>
    </div>
  );
}
