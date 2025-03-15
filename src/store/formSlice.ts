import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataState, FormState } from '../interfaces/interfaces';
import countriesList from './countriesList';

const initialState: DataState = {
  submissions: [],
  countries: countriesList,
};

const formSlice = createSlice({
  name: 'submitedData',
  initialState,
  reducers: {
    setSubmission: (state, action: PayloadAction<FormState>) => {
      state.submissions.push(action.payload);
    },
  },
});

export const { setSubmission } = formSlice.actions;
export default formSlice.reducer;
