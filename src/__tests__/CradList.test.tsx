import { render, screen } from '@testing-library/react';
import InfContext from '../context/';
import { vi } from 'vitest';
import CardList from '../components/CardList';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { BrowserRouter } from 'react-router';

const mockPlanet = {
  climate: 'temperate',
  created: '2014-12-10T11:35:48.479000Z',
  diameter: '12500',
  edited: '2014-12-20T20:58:18.420000Z',
  films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/6/'],
  gravity: '1 standard',
  name: 'Alderaan',
  orbital_period: '364',
  population: '2000000000',
  residents: [
    'https://swapi.dev/api/people/5/',
    'https://swapi.dev/api/people/68/',
    'https://swapi.dev/api/people/81/',
  ],
  rotation_period: '24',
  surface_water: '40',
  terrain: 'grasslands, mountains',
  url: 'https://swapi.dev/api/planets/2/',
};

describe('CardList', () => {
  test('displays error message when results is a string', () => {
    const contextValue = {
      page: 1,
      updatePage: vi.fn(),
      results: 'An error occurred while fetching the planets.',
      searchState: '',
      updateSearchState: vi.fn(),
      loading: false,
      theme: 'dark',
      setTheme: vi.fn(),
    };

    render(
      <Provider store={store}>
        {' '}
        <BrowserRouter>
          {' '}
          <InfContext.Provider value={contextValue}>
            <CardList />
          </InfContext.Provider>
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByText('An error occurred while fetching the planets.')
    ).toBeInTheDocument();
  });

  test('displays no results message when results is an empty array', () => {
    const contextValue = {
      page: 1,
      updatePage: vi.fn(),
      results: [],
      searchState: '',
      updateSearchState: vi.fn(),
      loading: false,
      theme: 'dark',
      setTheme: vi.fn(),
    };

    render(
      <Provider store={store}>
        {' '}
        <BrowserRouter>
          {' '}
          <InfContext.Provider value={contextValue}>
            <CardList />
          </InfContext.Provider>
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByText('No results found for your search.')
    ).toBeInTheDocument();
  });

  test('renders a list of cards when results is an array of planets', () => {
    const contextValue = {
      page: 1,
      updatePage: vi.fn(),
      results: [mockPlanet],
      searchState: '',
      updateSearchState: vi.fn(),
      loading: false,
      theme: 'dark',
      setTheme: vi.fn(),
    };

    render(
      <Provider store={store}>
        {' '}
        <BrowserRouter>
          {' '}
          <InfContext.Provider value={contextValue}>
            <CardList />
          </InfContext.Provider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(mockPlanet.name)).toBeInTheDocument();
    expect(screen.getByText(mockPlanet.climate)).toBeInTheDocument();
    expect(screen.getByText(mockPlanet.rotation_period)).toBeInTheDocument();
  });
});
