import { createContext } from 'react';
import { PlanetsType } from '../api/interface-api';

export interface InfContextType {
  searchState: string;
  updateSearchState: (search: string) => void;
  results: PlanetsType[] | string;
  loading: boolean;
}

const InfContext = createContext<InfContextType>({
  searchState: localStorage.getItem('searchState') || '',
  updateSearchState: () => {},
  results: [],
  loading: false,
});

export default InfContext;
