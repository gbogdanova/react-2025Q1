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
    <>
      <input type="text" placeholder="search..." onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
    </>
  );
}
