import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = vi.fn();

  const renderPagination = (
    currentPage: number,
    prevPage: string | null,
    nextPage: string | null
  ) => {
    return render(
      <Pagination
        currentPage={currentPage}
        prevPage={prevPage}
        nextPage={nextPage}
        onPageChange={mockOnPageChange}
      />
    );
  };

  it('renders current page number', () => {
    renderPagination(3, 'prev-url', 'next-url');

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders previous and next buttons when both pages exist', () => {
    renderPagination(2, 'prev-url', 'next-url');

    expect(screen.getByText('←')).toBeInTheDocument();
    expect(screen.getByText('→')).toBeInTheDocument();
  });

  it('does not render previous button if prevPage is null', () => {
    renderPagination(1, null, 'next-url');

    expect(screen.queryByText('←')).not.toBeInTheDocument();
    expect(screen.getByText('→')).toBeInTheDocument();
  });

  it('does not render next button if nextPage is null', () => {
    renderPagination(5, 'prev-url', null);

    expect(screen.getByText('←')).toBeInTheDocument();
    expect(screen.queryByText('→')).not.toBeInTheDocument();
  });

  it('calls onPageChange with the correct page when previous button is clicked', () => {
    renderPagination(3, 'prev-url', 'next-url');

    fireEvent.click(screen.getByText('←'));

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with the correct page when next button is clicked', () => {
    renderPagination(3, 'prev-url', 'next-url');

    fireEvent.click(screen.getByText('→'));

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('disables previous button when prevPage is null', () => {
    renderPagination(1, null, 'next-url');

    expect(screen.queryByText('←')).not.toBeInTheDocument();
  });

  it('disables next button when nextPage is null', () => {
    renderPagination(5, 'prev-url', null);

    expect(screen.queryByText('→')).not.toBeInTheDocument();
  });
});
