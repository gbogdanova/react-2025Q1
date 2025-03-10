import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '../components/Pagination';
import InfContext from '../store/planets-context';
import { vi } from 'vitest';
import { PlanetsType } from '../api/interface-api';

describe('Pagination Component', () => {
  const mockUpdatePage = vi.fn();

  const mockPlanetData: PlanetsType[] = [
    {
      name: 'Tatooine',
      rotation_period: '23',
      climate: 'Arid',
      gravity: '1 standard',
      population: '200000',
      created: '1977-01-01',
      edited: '2022-01-01',
      diameter: '10465',
      films: [],
      residents: [],
      orbital_period: '365',
      surface_water: '1',
      terrain: 'desert',
      url: 'http://example.com/tatooine',
    },
    {
      name: 'Alderaan',
      rotation_period: '24',
      climate: 'Temperate',
      gravity: '1 standard',
      population: '2000000',
      created: '1977-01-01',
      edited: '2022-01-01',
      diameter: '12500',
      films: [],
      residents: [],
      orbital_period: '365',
      surface_water: '1',
      terrain: 'grasslands',
      url: 'http://example.com/alderaan',
    },
  ];

  const renderWithContext = (
    page: number,
    results: PlanetsType[] = mockPlanetData
  ) => {
    return render(
      <InfContext.Provider
        value={{
          page,
          updatePage: mockUpdatePage,
          results,
          searchState: '',
          updateSearchState: vi.fn(),
          loading: false,
        }}
      >
        <Pagination />
      </InfContext.Provider>
    );
  };

  test('renders the current page number', () => {
    renderWithContext(3);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('calls updatePage with previous page when left arrow is clicked', async () => {
    renderWithContext(3);
    await userEvent.click(screen.getByText('←'));
    expect(mockUpdatePage).toHaveBeenCalledWith(2);
  });

  test('disables previous button on first page', () => {
    renderWithContext(1);
    expect(screen.getByText('←')).toBeDisabled();
  });

  test('disables next button on last page (page 6)', () => {
    renderWithContext(6);
    expect(screen.getByText('→')).toBeDisabled();
  });

  test('disables next button if there are fewer than 10 results', () => {
    renderWithContext(3, []);
    expect(screen.getByText('→')).toBeDisabled();
  });
});
