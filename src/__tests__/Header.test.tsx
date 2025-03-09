import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import InfContext from '../context/theme-context';

vi.mock('../components/ThemeBtn', () => ({
  default: () => <button data-testid="theme-btn">Theme</button>,
}));

describe('Header Component', () => {
  const mockOnSearch = vi.fn();

  const renderHeader = (theme: 'light' | 'dark', searchQuery = '') => {
    return render(
      <InfContext.Provider value={{ theme, setTheme: vi.fn() }}>
        <Header searchQuery={searchQuery} onSearch={mockOnSearch} />
      </InfContext.Provider>
    );
  };

  it('renders correctly', () => {
    renderHeader('light');

    expect(screen.getByText('Rick and Morty')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Search characters...')
    ).toBeInTheDocument();
    expect(screen.getByTestId('theme-btn')).toBeInTheDocument();
  });

  it('displays initial search query', () => {
    renderHeader('light', 'Rick');

    const input = screen.getByPlaceholderText(
      'Search characters...'
    ) as HTMLInputElement;
    expect(input.value).toBe('Rick');
  });

  it('updates input value when typing', () => {
    renderHeader('light');

    const input = screen.getByPlaceholderText(
      'Search characters...'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Morty' } });

    expect(input.value).toBe('Morty');
  });

  it('calls onSearch with the new value when submitted', () => {
    renderHeader('light', 'Rick');

    const input = screen.getByPlaceholderText('Search characters...');
    const form = input.closest('form');

    if (form) {
      fireEvent.change(input, { target: { value: 'Morty' } });
      fireEvent.submit(form);
    }

    expect(mockOnSearch).toHaveBeenCalledWith('Morty');
  });

  it('applies dark theme class when theme is dark', () => {
    renderHeader('dark');

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-[#1a1f45]');
  });

  it('applies light theme class when theme is light', () => {
    renderHeader('light');

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('text-blue-950');
  });
});
