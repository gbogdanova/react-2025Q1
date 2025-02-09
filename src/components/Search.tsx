import { useContext } from 'react';
import FilmsContext from '../store/planets-context';
import useSearchQuery from '../hooks/useSearchQuery';

export default function Search() {
  const { updateSearchState } = useContext(FilmsContext);

  const { searchQuery, setSearchQuery, saveSearchQuery } = useSearchQuery();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.trim());
  };

  const handleSearch = () => {
    saveSearchQuery();
    updateSearchState(searchQuery);
  };

  return (
    <div className="flex justify-end gap-3">
      <input
        className="border  border-[#1A237E] rounded-lg p-2 focus:outline-none shadow-lg shadow-blue-500/50 focus:ring-[#ffffff]"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleChange}
      />
      <button
        className="border-1 rounded-lg border-amber-200 text-amber-200 px-4 py-2  hover:opacity-75 hover:cursor-pointer"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
