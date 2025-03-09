import React from 'react';
import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

describe('ErrorBoundary Component', () => {
  const ProblematicComponent = () => {
    throw new Error('Test error');
  };

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <p>Test Child Component</p>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Child Component')).toBeInTheDocument();
  });

  it('renders fallback UI when an error occurs', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(/Error Boundary testing success!/i)
    ).toBeInTheDocument();

    consoleErrorMock.mockRestore(); // Restore console error
  });
});
