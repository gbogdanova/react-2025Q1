import React from 'react';
import { expect, describe, it, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, Store } from '@reduxjs/toolkit';
import selectedItemsReducer from '../redux/selectedItemsSlice';
import CardList from '../components/CardList';
import { Character } from '../api/interface-api';

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

describe('CardList Component', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: { selectedItems: selectedItemsReducer },
    });
  });

  it("renders 'No results found' message when character list is empty", () => {
    render(
      <Provider store={store}>
        <CardList characters={[]} onItemClick={vi.fn()} />
      </Provider>
    );

    expect(
      screen.getByText('No results found for your search.')
    ).toBeInTheDocument();
  });

  it('renders a list of character cards', () => {
    render(
      <Provider store={store}>
        <CardList characters={mockCharacters} onItemClick={() => {}} />
      </Provider>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });
});
