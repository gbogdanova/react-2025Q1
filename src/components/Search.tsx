import { useRef } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const searchQuery = useRef<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchQuery.current = e.target.value.trim();
  };

  const handleSearch = () => {
    onSearch(searchQuery.current);
  };

  return (
    <div className="flex justify-end gap-3">
      <input
        className="border  border-sky-700 rounded-lg p-2 focus:outline-none  focus:ring-[#ffffff]"
        type="text"
        placeholder="search..."
        onChange={handleInputChange}
      />
      <button
        className="border-1 rounded-lg border-sky-700 text-sky-700 px-4 py-2  hover:opacity-75 hover:cursor-pointer hover:bg-sky-300"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
