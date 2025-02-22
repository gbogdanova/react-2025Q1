import { render, screen } from '@testing-library/react';
import Spinner from '../components/Spinner';

describe('Spinner', () => {
  it('should render a spinning circle', () => {
    render(<Spinner />);

    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass('animate-spin');
    expect(spinnerElement).toHaveClass('rounded-full');
    expect(spinnerElement).toHaveClass('border-b-3');
    expect(spinnerElement).toHaveClass('border-gray-200');
  });
});
