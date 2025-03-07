import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Floyout from '../components/Flyout';
import { unselectAll } from '../redux/selectedItemsSlice';

const mockStore = configureStore([]);
const mockDispatch = vi.fn();

vi.mock('react-redux', async () => {
  const actual =
    await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

describe('Floyout Component', () => {
  test('displays correct item count when multiple items are selected', () => {
    const store = mockStore({
      selectedItems: { selectedItems: [{ name: 'Rick' }, { name: 'Morty' }] },
    });

    render(
      <Provider store={store}>
        <Floyout />
      </Provider>
    );

    expect(screen.getByText('2 items are selected')).toBeInTheDocument();
  });

  test('displays correct item count when one item is selected', () => {
    const store = mockStore({
      selectedItems: { selectedItems: [{ name: 'Rick' }] },
    });

    render(
      <Provider store={store}>
        <Floyout />
      </Provider>
    );

    expect(screen.getByText('1 item is selected')).toBeInTheDocument();
  });

  test('calls unselectAll action when "Unselect all" button is clicked', () => {
    const store = mockStore({
      selectedItems: { selectedItems: [{ name: 'Rick' }] },
    });

    render(
      <Provider store={store}>
        <Floyout />
      </Provider>
    );

    const unselectBtn = screen.getByText('Unselect all');
    fireEvent.click(unselectBtn);

    expect(mockDispatch).toHaveBeenCalledWith(unselectAll());
  });
});
