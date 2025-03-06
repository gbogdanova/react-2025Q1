import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import selectedItemsReducer from './selectedItemsSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

// Create wrapper for SSR
export const wrapper = createWrapper(makeStore);
