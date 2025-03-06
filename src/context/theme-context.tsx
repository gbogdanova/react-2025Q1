'use client';
import { createContext } from 'react';

export interface InfContextType {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

const InfContext = createContext<InfContextType>({
  theme: 'dark',
  setTheme: () => {},
});

export default InfContext;
