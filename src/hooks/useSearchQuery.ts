import { useState, useEffect } from 'react';

export default function useSearchQuery() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const storedQuery = localStorage.getItem('searchState') || '';
    setSearchQuery(storedQuery);
  }, []);

  useEffect(() => {
    localStorage.setItem('searchState', searchQuery);
  }, [searchQuery]);
  return { searchQuery, setSearchQuery };
}
