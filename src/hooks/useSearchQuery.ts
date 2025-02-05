import { useState, useEffect } from 'react';

export default function useSearchQuery() {
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem('searchState') || ''
  );
  useEffect(() => {
    localStorage.setItem('searchState', searchQuery);
  }, [searchQuery]);

  return { searchQuery, setSearchQuery };
}
