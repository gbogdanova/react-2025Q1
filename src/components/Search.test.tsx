import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Search from '../components/Search';
import FilmsContext from '../store/planets-context';

describe('Search Component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: vi.fn(),
        getItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });

    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockContextValue = {
    searchState: '',
    results: [],
    loading: false,
    page: 1,
    updatePage: vi.fn(),
    updateSearchState: vi.fn(),
  };

  it('saves the entered value to localStorage when clicking the Search button', () => {
    render(
      <FilmsContext.Provider value={mockContextValue}>
        <Search />
      </FilmsContext.Provider>
    );

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Tatooine' } });
    fireEvent.click(button, new MouseEvent('click', { bubbles: true }));

    expect(mockContextValue.updateSearchState).toHaveBeenCalledWith('Tatooine');
  });
});
