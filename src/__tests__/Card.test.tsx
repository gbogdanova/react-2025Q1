import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { server } from '../mocks/node';
import Card from '../components/Card';

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

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders relevant card data', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Card planet={mockPlanet} />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => screen.getByText(/Alderaan/i));

  expect(screen.getByText(/Rotation Period:/i)).toBeInTheDocument();
  expect(screen.getByText('24')).toBeInTheDocument();
  expect(screen.getByText(/Climate:/i)).toBeInTheDocument();
  expect(screen.getByText('temperate')).toBeInTheDocument();
  expect(screen.getByText(/Gravity:/i)).toBeInTheDocument();
  expect(screen.getByText('1 standard')).toBeInTheDocument();
  expect(screen.getByText(/Population:/i)).toBeInTheDocument();
  expect(screen.getByText('2000000000')).toBeInTheDocument();
});
