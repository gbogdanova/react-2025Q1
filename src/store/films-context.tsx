import { Component, createContext, ReactNode } from 'react';

export interface FilmsContextType {
  searchState: string;
  setSearchState: (search: string) => void;
}

export const FilmsContext = createContext<FilmsContextType>({
  searchState: localStorage.getItem('searchState') || '',
  setSearchState: () => {},
});

interface FilmsProviderProps {
  children: ReactNode;
}

export default class FilmsProvider extends Component<
  FilmsProviderProps,
  { searchState: string }
> {
  constructor(props: FilmsProviderProps) {
    super(props);
    this.state = {
      searchState: localStorage.getItem('searchState') || '',
    };
  }

  setSearchState = (search: string) => {
    this.setState({ searchState: search });
  };

  render() {
    return (
      <FilmsContext.Provider
        value={{
          searchState: this.state.searchState,
          setSearchState: this.setSearchState,
        }}
      >
        {this.props.children}
      </FilmsContext.Provider>
    );
  }
}
