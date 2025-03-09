import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import InfContext from '../context/theme-context';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../components/ThemeBtn', () => ({
  default: () => <button data-testid="theme-btn">Theme</button>,
}));

describe('Header Component', () => {
  const renderHeader = (theme: 'light' | 'dark') => {
    return render(
      <InfContext.Provider value={{ theme, setTheme: vi.fn() }}>
        <Header />
      </InfContext.Provider>
    );
  };

  it('renders correctly', () => {
    renderHeader('light');

    expect(screen.getByText('Rick and Morty')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByTestId('theme-btn')).toBeInTheDocument();
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

  it('updates input value when typing', () => {
    renderHeader('light');

    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Morty' } });

    expect(input.value).toBe('Morty');
  });
});
