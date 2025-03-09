import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TestBtn from '../components/TestBtn';
import InfProvider from '../context/theme-provider';
import ErrorBoundary from '../components/ErrorBoundary';

test('renders the button and triggers error on click', async () => {
  render(
    <ErrorBoundary>
      <InfProvider>
        <TestBtn />
      </InfProvider>
    </ErrorBoundary>
  );

  const button = screen.getByRole('button', { name: /Trigger Error/i });
  fireEvent.click(button);

  const errorMessage = await screen.findByText(
    (content, element) =>
      element?.tagName.toLowerCase() === 'p' &&
      content.includes('Error Boundary testing success!')
  );

  expect(errorMessage).toBeInTheDocument();
});
