import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { vi } from 'vitest';
import Details from './Details';
import { fetchPlanetDetails } from '../api/planets-api';

vi.mock('../api/planets-api', () => ({
  fetchPlanetDetails: vi.fn(),
}));

const mockPlanetData = {
  name: 'Tatooine',
  rotation_period: '23',
  climate: 'Arid',
  gravity: '1 standard',
  population: '200000',
};

const renderWithRouter = (ui: React.ReactNode, route: string) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/planet/:id" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Details Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('displays loading indicator while fetching data', async () => {
    (fetchPlanetDetails as jest.Mock).mockResolvedValueOnce(mockPlanetData);

    renderWithRouter(<Details />, '/planet/1');

    await waitFor(() =>
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
    );
  });

  test('displays planet details correctly after fetching data', async () => {
    (fetchPlanetDetails as jest.Mock).mockResolvedValueOnce(mockPlanetData);

    renderWithRouter(<Details />, '/planet/1');

    await waitFor(() =>
      expect(screen.getByText(/Tatooine/i)).toBeInTheDocument()
    );

    expect(screen.getByText(/Rotation Period:/i)).toBeInTheDocument();
    expect(screen.getByText('23')).toBeInTheDocument();
    expect(screen.getByText(/Climate:/i)).toBeInTheDocument();
    expect(screen.getByText('Arid')).toBeInTheDocument();
    expect(screen.getByText(/Gravity:/i)).toBeInTheDocument();
    expect(screen.getByText('1 standard')).toBeInTheDocument();
    expect(screen.getByText(/Population:/i)).toBeInTheDocument();
    expect(screen.getByText('200000')).toBeInTheDocument();
  });

  test('closes the details view when close button is clicked', async () => {
    (fetchPlanetDetails as jest.Mock).mockResolvedValueOnce(mockPlanetData);

    renderWithRouter(<Details />, '/planet/1');

    await waitFor(() =>
      expect(screen.getByText(/Tatooine/i)).toBeInTheDocument()
    );

    await userEvent.click(screen.getByText('✖ Close'));

    await waitFor(() => {
      expect(screen.queryByText(/Tatooine/i)).not.toBeInTheDocument();
    });
  });
});
