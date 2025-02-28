import { createContext } from 'react';
import { PlanetsType } from '../api/interface-api';

export interface InfContextType {
  searchState: string;
  updateSearchState: (search: string) => void;
  results: PlanetsType[] | string;
  loading: boolean;
  // page: number;
  updatePage: (newPage: number) => void;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const InfContext = createContext<InfContextType>({
  searchState: '',
  updateSearchState: () => {},
  results: [],
  loading: false,
  //page: 1,
  updatePage: () => {},
  theme: 'dark',
  setTheme: () => {},
});

export default InfContext;
