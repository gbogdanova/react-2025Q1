import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, describe } from 'vitest';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  test('render page number', () => {
    render(
      <Pagination
        prevPage={null}
        nextPage={null}
        currentPage={3}
        searchQuery={'test'}
      />
    );
    expect(screen.getByText('3')).toBeInTheDocument();
  });
  test('render page number', () => {
    render(
      <Pagination
        prevPage={null}
        nextPage={null}
        currentPage={3}
        searchQuery={'test'}
      />
    );
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('render previous page link', () => {
    render(
      <Pagination
        prevPage={2}
        nextPage={null}
        currentPage={3}
        searchQuery={'test'}
      />
    );
    expect(screen.getByRole('link', { name: /←/i }));
  });

  test('render next page link', () => {
    render(
      <Pagination
        prevPage={2}
        nextPage={4}
        currentPage={3}
        searchQuery={'test'}
      />
    );
    expect(screen.getByRole('link', { name: /→/i }));
  });
});
