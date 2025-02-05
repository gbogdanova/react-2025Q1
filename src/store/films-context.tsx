import { createContext } from 'react';
import { FilmType } from '../api/interface-api';

export interface FilmsContextType {
  searchState: string;
  updateSearchState: (search: string) => void;
  results: FilmType[] | string;
  loading: boolean;
}

const FilmsContext = createContext<FilmsContextType>({
  searchState: localStorage.getItem('searchState') || '',
  updateSearchState: () => {},
  results: [],
  loading: false,
});

export default FilmsContext;
