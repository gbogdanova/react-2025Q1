import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import InfContext from '../context/';
import { BrowserRouter } from 'react-router';
import TestBtn from '../components/TestBtn';

const MockContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('dark');
  return (
    <InfContext.Provider
      value={{
        theme,
        setTheme,
        searchState: '',
        updateSearchState: () => {},
        results: [],
        loading: false,
        page: 1,
        updatePage: () => {},
      }}
    >
      {children}
    </InfContext.Provider>
  );
};

describe('TestBtn', () => {
  it('should render the button and apply styles based on the theme', () => {
    render(
      <MockContextProvider>
        <BrowserRouter>
          <TestBtn />
        </BrowserRouter>
      </MockContextProvider>
    );

    const button = screen.getByText('Trigger Error');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'border-1 text-red-600 px-4 py-2 rounded-lg hover:opacity-75 hover:cursor-pointer'
    );
  });
});
