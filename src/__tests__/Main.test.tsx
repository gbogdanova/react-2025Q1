import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import InfContext from '../context/planets-context';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Main from '../pages';
import { BrowserRouter } from 'react-router';
import App from '../pages/_app';
import { vi } from 'vitest';

vi.mock('../components/Spinner', () => ({
  __esModule: true,
  default: () => <div data-testid="spinner">Loading...</div>,
}));

const MockContextProvider = ({
  children,
  loadingState,
}: {
  children: React.ReactNode;
  loadingState: boolean;
}) => {
  const contextValue = {
    searchState: localStorage.getItem('searchState') || '',
    updateSearchState: () => {},
    results: [],
    loading: loadingState,
    page: 1,
    updatePage: () => {},
    theme: 'dark',
    setTheme: () => {},
  };

  return (
    <InfContext.Provider value={contextValue}>{children}</InfContext.Provider>
  );
};

describe('Main Component', () => {
  it('should display the loading spinner when loading is true', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <MockContextProvider loadingState={true}>
            <Main />
          </MockContextProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  describe('App Component', () => {
    it('should render correctly', () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );

      expect(screen.getByText('Star Wars')).toBeInTheDocument();
    });
  });
});
