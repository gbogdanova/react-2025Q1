import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Floyout from '../components/Flyout';
import { unselectAll } from '../redux/selectedItemsSlice';
import { vi } from 'vitest';

beforeAll(() => {
  global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
});

const mockSelectedItems = [
  {
    name: 'Alderaan',
    diameter: '12500',
    population: '2000000000',
    gravity: '1 standard',
    url: 'https://swapi.dev/api/planets/2/',
  },
  {
    name: 'Tatooine',
    diameter: '10465',
    population: '200000',
    gravity: '1 standard',
    url: 'https://swapi.dev/api/planets/1/',
  },
];

describe('Floyout', () => {
  test('dispatches unselectAll action and clears selected items', async () => {
    const mockDispatch = vi.fn();
    const mockStore = {
      ...store,
      dispatch: mockDispatch,
      getState: () => ({ selectedItems: { selectedItems: mockSelectedItems } }),
    };

    render(
      <Provider store={mockStore}>
        <Floyout />
      </Provider>
    );

    expect(screen.getByText('2 items are selected')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Unselect all'));

    expect(mockDispatch).toHaveBeenCalledWith(unselectAll());
  });

  test('generates a CSV file and prepares it for download', async () => {
    const mockDispatch = vi.fn();
    const mockStore = {
      ...store,
      dispatch: mockDispatch,
      getState: () => ({ selectedItems: { selectedItems: mockSelectedItems } }),
    };

    render(
      <Provider store={mockStore}>
        <Floyout />
      </Provider>
    );

    const downloadButton = screen.getByText('Download');
    fireEvent.click(downloadButton);

    await waitFor(() =>
      expect(screen.getByText('Download').closest('a')).toHaveAttribute('href')
    );

    const downloadLink = screen.getByText('Download').closest('a');
    const downloadUrl = downloadLink?.getAttribute('href');
    expect(downloadUrl).toBeTruthy();
    expect(downloadUrl?.startsWith('blob:')).toBe(true);

    expect(downloadLink).toHaveAttribute('download', '2_planets.csv');
  });
});
