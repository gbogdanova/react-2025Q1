import { useState } from 'react';

export default function useSearchQuery() {
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem('searchState') || ''
  );
  const saveSearchQuery = () => {
    localStorage.setItem('searchState', searchQuery);
  };
  return { searchQuery, setSearchQuery, saveSearchQuery };
}
