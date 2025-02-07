import { createContext } from 'react';
import { PlanetsType } from '../api/interface-api';

export interface InfContextType {
  searchState: string;
  updateSearchState: (search: string) => void;
  results: PlanetsType[] | string;
  loading: boolean;
  page: number;
  updatePage: (newPage: number) => void;
}

const InfContext = createContext<InfContextType>({
  searchState: localStorage.getItem('searchState') || '',
  updateSearchState: () => {},
  results: [],
  loading: false,
  page: 1,
  updatePage: () => {},
});

export default InfContext;
