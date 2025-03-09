import React from 'react';
import { render, screen } from '@testing-library/react';
import CharactersPage from '../pages/index';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { vi, Mock } from 'vitest'; // Import Mock explicitly
import { Store } from '@reduxjs/toolkit';
import { Character } from '../api/interface-api';
import { useRouter } from 'next/router';

const mockStore = configureStore([]);

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockedUseRouter = useRouter as Mock; // Explicitly cast useRouter as a Mock

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    species: 'Human',
    gender: 'Male',
    status: 'Alive',
    type: '',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:50:21.651Z',
  },
  {
    id: 2,
    name: 'Morty Smith',
    species: 'Human',
    gender: 'Male',
    status: 'Alive',
    type: '',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    url: 'https://rickandmortyapi.com/api/character/2',
    created: '2017-11-04T18:50:21.651Z',
  },
];

describe('CharactersPage', () => {
  let store: Store;
  beforeEach(() => {
    store = mockStore({
      selectedItems: { selectedItems: [] },
    });

    mockedUseRouter.mockReturnValue({
      query: {},
      push: vi.fn(),
      pathname: '/',
      asPath: '/',
      events: {
        on: vi.fn(),
        off: vi.fn(),
      },
    });
  });

  test('renders the page title and header', () => {
    render(
      <Provider store={store}>
        <CharactersPage
          characters={mockCharacters}
          nextPage={2}
          prevPage={null}
          currentPage={1}
          searchQuery=""
        />
      </Provider>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument(); // Search bar
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });
});
