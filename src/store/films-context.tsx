import { Component, createContext, ReactNode } from 'react';
import fetchFilmsFromAPI from '../api/films-api';
import { FilmType } from '../api/interface-api';

export interface FilmsContextType {
  searchState: string;
  setSearchState: (search: string) => void;
  results: FilmType[];
  fetchFilms: () => void;
}

export const FilmsContext = createContext<FilmsContextType>({
  searchState: localStorage.getItem('searchState') || '',
  setSearchState: () => {},
  results: [],
  fetchFilms: () => {},
});

interface FilmsProviderProps {
  children: ReactNode;
}

export default class FilmsProvider extends Component<
  FilmsProviderProps,
  { searchState: string; results: FilmType[] }
> {
  constructor(props: FilmsProviderProps) {
    super(props);
    this.state = {
      searchState: localStorage.getItem('searchState') || '',
      results: [],
    };
  }

  setSearchState = (search: string) => {
    localStorage.setItem('searchState', search);
    this.setState({ searchState: search }, this.fetchFilms);
  };

  fetchFilms = async () => {
    const results = await fetchFilmsFromAPI(this.state.searchState);
    this.setState({ results });
  };

  componentDidMount(): void {
    this.fetchFilms();
  }

  render() {
    return (
      <FilmsContext.Provider
        value={{
          searchState: this.state.searchState,
          setSearchState: this.setSearchState,
          results: this.state.results,
          fetchFilms: this.fetchFilms,
        }}
      >
        {this.props.children}
      </FilmsContext.Provider>
    );
  }
}
