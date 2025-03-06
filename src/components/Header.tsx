import { useState, useContext } from 'react';
import ThemeBtn from './ThemeBtn';
import InfContext from '../context/theme-context';

interface HeaderProps {
  searchQuery: string;
  onSearch: (searchTerm: string) => void;
}

export default function Header({ searchQuery, onSearch }: HeaderProps) {
  const [search, setSearch] = useState<string>(searchQuery);
  const { theme } = useContext(InfContext);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim() === searchQuery) return;
    onSearch(search);
  };

  return (
    <header
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 p-6 flex justify-between   ${theme === 'dark' ? 'bg-[#1a1f45]' : 'text-blue-950'}`}
    >
      <h1 className="w-[33%] font-[Orbitron] text-3xl text-amber-300 py-1">
        Rick and Morty
      </h1>
      <ThemeBtn />
      <form className="flex justify-end gap-3 w-[33%]" onSubmit={handleSearch}>
        <input
          className="border border-[#1A237E] rounded-lg p-2 focus:outline-none shadow-lg shadow-blue-500/50 focus:ring-[#ffffff]"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search characters..."
        />
        <button
          className="border-1 rounded-lg border-amber-200 text-amber-200 px-4 py-2  hover:opacity-75 hover:cursor-pointer"
          type="submit"
        >
          Search
        </button>
      </form>
    </header>
  );
}
