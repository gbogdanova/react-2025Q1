import { ReactNode, useState, useEffect } from 'react';
import fetchFromAPI from '../api/planets-api';
import { PlanetsType } from '../api/interface-api';
import InfContext from './planets-context';

interface PlanetsProviderProps {
  children: ReactNode;
}

export default function InfProvider({ children }: PlanetsProviderProps) {
  const [searchState, setSearchState] = useState<string>(
    localStorage.getItem('searchState') || ''
  );
  const [results, setResults] = useState<PlanetsType[] | string>([]);
  const [loading, setLoading] = useState<boolean>(false);
  //const [page, setPage] = useState<number>(1);

  const updateSearchState = (search: string) => {
    setSearchState(search);
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const fetchedResults = await fetchFromAPI(searchState);
        setResults(fetchedResults);
      } catch (error) {
        console.error('Error fetching films:', error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [searchState]);

  return (
    <InfContext.Provider
      value={{
        searchState,
        updateSearchState,
        results,
        loading,
      }}
    >
      {children}
    </InfContext.Provider>
  );
}
