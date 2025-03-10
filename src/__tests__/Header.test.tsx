import { screen, render } from '@testing-library/react';
import Header from '../components/Header';
import { expect } from 'vitest';

describe('Header tests', () => {
  it('should render the header', () => {
    render(<Header />);
    expect(screen.getByText('Star Wars')).toBeInTheDocument();
  });
});
