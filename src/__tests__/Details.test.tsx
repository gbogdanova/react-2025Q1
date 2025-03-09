import React from 'react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Details from '../components/Details';
import { Character } from '../api/interface-api';
import InfProvider from '../context/theme-provider';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Details Component', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    species: 'Human',
    status: 'Alive',
    gender: 'Male',
    type: '',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:50:21.651Z',
  };

  it('renders a loading spinner when isDetailLoading is true', () => {
    render(
      <InfProvider>
        <Details selectedCharacter={undefined} isDetailLoading={true} />
      </InfProvider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays "Select a character" message when no character is selected', () => {
    render(
      <InfProvider>
        <Details selectedCharacter={undefined} isDetailLoading={false} />
      </InfProvider>
    );

    expect(
      screen.getByText('Select a character to see details.')
    ).toBeInTheDocument();
  });

  it('renders character details when selectedCharacter is provided', () => {
    render(
      <InfProvider>
        <Details selectedCharacter={mockCharacter} isDetailLoading={false} />
      </InfProvider>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /rick sanchez/i })
    ).toBeInTheDocument();
  });
});
