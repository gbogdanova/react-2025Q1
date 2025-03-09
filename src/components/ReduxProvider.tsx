'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ReactNode } from 'react';

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
