'use client';
import React, { ReactNode, useState } from 'react';
import InfContext from './theme-context';

interface ProviderProps {
  children: ReactNode;
}

export default function InfProvider({ children }: ProviderProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return (
    <InfContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </InfContext.Provider>
  );
}
