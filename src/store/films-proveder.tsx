import { ReactNode, useState, useEffect } from 'react';
import fetchFilmsFromAPI from '../api/films-api';
import { FilmType } from '../api/interface-api';
import FilmsContext from './films-context';

interface FilmsProviderProps {
  children: ReactNode;
}

export default function FilmsProvider({ children }: FilmsProviderProps) {
  const [searchState, setSearchState] = useState<string>(
    localStorage.getItem('searchState') || ''
  );
  const [results, setResults] = useState<FilmType[] | string>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const updateSearchState = (search: string) => {
    localStorage.setItem('searchState', search);
    setSearchState(search);
  };

  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true);
      try {
        const fetchedResults = await fetchFilmsFromAPI(searchState);
        setResults(fetchedResults);
      } catch (error) {
        console.error('Error fetching films:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, [searchState]);

  return (
    <FilmsContext.Provider
      value={{
        searchState,
        updateSearchState,
        results,
        loading,
      }}
    >
      {children}
    </FilmsContext.Provider>
  );
}
