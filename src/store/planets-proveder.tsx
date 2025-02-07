import { ReactNode, useState, useEffect } from 'react';
import fetchFromAPI from '../api/planets-api';
import { PlanetsType } from '../api/interface-api';
import InfContext from './planets-context';
import { useSearchParams } from 'react-router';

interface PlanetsProviderProps {
  children: ReactNode;
}

export default function InfProvider({ children }: PlanetsProviderProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = localStorage.getItem('searchState') || '';
  const initialPage = Number(searchParams.get('page')) || 1;

  const [searchState, setSearchState] = useState<string>(initialSearch);
  const [results, setResults] = useState<PlanetsType[] | string>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(initialPage);

  const updateSearchState = (search: string) => {
    setSearchState(search);
    setPage(1);

    const params = new URLSearchParams();
    if (search) params.set('search', search);
    params.set('page', '1');
    setSearchParams(params);
  };

  const updatePage = (newPage: number) => {
    setPage(newPage);

    const params = new URLSearchParams();
    if (searchState) params.set('search', searchState);
    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const fetchedResults = await fetchFromAPI(searchState, page);
        setResults(fetchedResults);
      } catch (error) {
        console.error('Error fetching films:', error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [searchState, page]);

  return (
    <InfContext.Provider
      value={{
        searchState,
        updateSearchState,
        results,
        loading,
        page,
        updatePage,
      }}
    >
      {children}
    </InfContext.Provider>
  );
}
