import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { server } from '../mocks/node';
import Details from '../pages/details/[id]';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Details Component', () => {
  test('displays planet details correctly after fetching data', async () => {
    render(
      <Provider store={store}>
        {' '}
        <MemoryRouter initialEntries={['/planet/1']}>
          <Routes>
            <Route path="/planet/:id" element={<Details />} />
          </Routes>
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
});
