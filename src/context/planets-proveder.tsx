import { ReactNode, useState } from 'react';
import { useGetPlanetsQuery } from '../api/planets-api';
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
  const [page, setPage] = useState<number>(initialPage);
  const [theme, setTheme] = useState<string>('dark');

  const { data, isLoading } = useGetPlanetsQuery({ searchState, page });

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

  return (
    <InfContext.Provider
      value={{
        searchState,
        updateSearchState,
        results: data?.results || [],
        loading: isLoading,
        page,
        updatePage,
        theme,
        setTheme,
      }}
    >
      {children}
    </InfContext.Provider>
  );
}
