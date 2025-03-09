import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReduxProvider from '../components/ReduxProvider';
import { useSelector } from 'react-redux';

function TestComponent() {
  const storeState = useSelector((state) => state);
  return <div data-testid="store-data">{JSON.stringify(storeState)}</div>;
}

describe('ReduxProvider', () => {
  it('provides the Redux store to its children', () => {
    render(
      <ReduxProvider>
        <TestComponent />
      </ReduxProvider>
    );

    const storeData = screen.getByTestId('store-data');
    expect(storeData).toBeInTheDocument();
    expect(storeData.textContent).not.toBeNull();
  });
});
