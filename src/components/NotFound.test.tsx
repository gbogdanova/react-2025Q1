import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound Component', () => {
  test('renders the 404 heading', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  test('renders the Page Not Found message', () => {
    render(<NotFound />);
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  test('applies correct styles', () => {
    render(<NotFound />);
    const heading = screen.getByText('404');
    expect(heading).toHaveClass('text-8xl font-[Orbitron] text-amber-300');
  });
});
