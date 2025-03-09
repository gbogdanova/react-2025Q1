import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeBtn from '../components/ThemeBtn';
import InfContext from '../context/theme-context';

describe('ThemeBtn Component', () => {
  const mockSetTheme = vi.fn();

  const renderThemeBtn = (theme: 'light' | 'dark') => {
    return render(
      <InfContext.Provider value={{ theme, setTheme: mockSetTheme }}>
        <ThemeBtn />
      </InfContext.Provider>
    );
  };

  it('renders correctly with dark theme', () => {
    renderThemeBtn('dark');

    const button = screen.getByRole('button');
    const img = screen.getByRole('img');

    expect(button).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/assets/moon.png');
  });

  it('renders correctly with light theme', () => {
    renderThemeBtn('light');

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/assets/sun.png');
  });

  it('calls setTheme function when clicked', () => {
    renderThemeBtn('dark');

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('toggles from light to dark theme on click', () => {
    renderThemeBtn('light');

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});
